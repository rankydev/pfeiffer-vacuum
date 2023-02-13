import { defineStore } from 'pinia'
import { computed, ref, useContext, useRoute } from '@nuxtjs/composition-api'
import { useAxiosForEmpolis } from '~/composables/useAxiosForEmpolis'
import { useLanguageSwitch } from '~/composables/useLanguageSwitch'
import { useLogger } from '~/composables/useLogger'
import { PAGE_SIZE_DEFAULT } from '~/config/pagination.config'

const PDP_DOCUMENT_LIMIT = 500

export const useEmpolisStore = defineStore('empolis', () => {
  const productDownloads = ref(new Map())
  const searchResultsCache = ref(new Map())
  const searchResults = ref(null)
  const searchResultsLoading = ref(false)
  const searchResultsLoadingError = ref(false)
  const { logger } = useLogger('empolisStore')

  const route = useRoute()
  const { axios } = useAxiosForEmpolis()
  const { i18n } = useContext()
  const { onLanguageSwitched } = useLanguageSwitch()

  const language = computed(() => {
    return i18n.locale === 'de' ? 'de' : 'en'
  })

  const loadByPath = async () => {
    // first check if we have cached results for this url (includes all filters, pageSize, ...)
    const cacheKey = route.value.fullPath
    // TODO: this needs to be rethinked because multiple request results need to cached (filters, translated filters, )
    // if (searchResultsCache.value.has(cacheKey)) {
    //   searchResults.value = searchResultsCache.value.get(cacheKey)
    //   return
    // }

    // load search results by query if not found in cache
    const term = route.value.query.searchTerm || ''
    const currentPage = Number(route.value.query.currentPage || 1)
    const pageSize = Number(route.value.query.pageSize || PAGE_SIZE_DEFAULT)

    const filtersFromQuery = route.value.query.filter
      ? JSON.parse(decodeURIComponent(route.value.query.filter.toString()))
      : {}

    searchResultsLoading.value = true
    searchResultsLoadingError.value = false

    try {
      // first get translates filters filters
      const activeFilters = await getTranslatedFilters(filtersFromQuery)
      console.log('activeFilters', activeFilters)

      // then fetch all available filters dependent on the current items
      const availableFilters = await getFilterItems(
        filtersFromQuery,
        activeFilters
      )
      console.log('availableFilters', availableFilters)

      // TODO: also load filterSuggestions with "annotateText". Can be async (without await in the first place for parallelization)
      // no dependency after it as it looks like now

      // TODO: grep filter options here later, too. [PVWEB-550]
      const files = await fetchSearchResults({
        text: term,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
      })
      searchResults.value = files
      searchResultsCache.value.set(cacheKey, files)
    } catch (e) {
      logger.error(e)
      searchResults.value = null
      searchResultsLoadingError.value = true
    } finally {
      searchResultsLoading.value = false
    }
  }

  const getTranslatedFilters = async (filters) => {
    try {
      const result = await axios.$post('/translate', {
        filters,
        language: language.value,
      })

      if (result && Array.isArray(result) && !result.error) {
        return JSON.parse(JSON.stringify(result))
      }
      throw result.error ? result.error : 'unknown error'
    } catch (e) {
      logger.error(
        'Error when translating filterObject. Returning empty array.',
        e ? e : ''
      )
      return []
    }
  }

  const getFilterItems = async (filters, activeFilters) => {
    try {
      const result = await axios.$post('/filters', {
        filter: filters, // NOTE: yes this is no typo but the API really needs "filter" here instead of "filters"
        language: language.value,
      })

      if (result && Array.isArray(result.filters) && !result.error) {
        // 'DocumentType' and 'Category' are standardized Empolis filters we don't want to display
        const tempFilters = result.filters.filter(
          (obj) => !['DocumentType', 'Category'].includes(obj.attribute)
        )

        const activeFiltersString = []
        for (let i = 0; i < activeFilters.length; i++) {
          for (let k = 0; k < activeFilters[i].concepts.length; k++) {
            activeFiltersString.push(activeFilters[i].concepts[k].id)
          }
        }

        for (let i = 0; i < tempFilters.length; i++) {
          for (let k = 0; k < tempFilters[i].concepts.length; k++) {
            tempFilters[i].concepts[k].checked = activeFiltersString.includes(
              tempFilters[i].concepts[k].id
            )
          }
        }

        return tempFilters.map((v) => ({ ...v, visible: true }))
      }

      throw result.error ? result.error : 'unknown error'
    } catch (e) {
      logger.error(
        'Error when fetching filters. Returning empty array.',
        e ? e : ''
      )
      return []
    }
  }

  const fetchSearchResults = async (searchOptions = {}) => {
    // composing final search options by overriding defaults with (optional) custom options
    const options = {
      text: '',
      filter: {},
      offset: 0,
      limit: PAGE_SIZE_DEFAULT,
      ...searchOptions,
      language: language.value,
    }

    try {
      const files = await axios.$post('/search', options)

      // successful search. resolve promise successfully by returning search result
      if (files && Array.isArray(files.results) && !files.error) {
        return files
      }

      // empolis search error
      if (files.error) {
        throw files.error
      }
      // unknown error
      throw 'wrong empolis response schema'
    } catch (e) {
      logger.error(
        `Error when fetching empolis search results for '${
          options.text ? options.text : ''
        }'.`
      )
      // propagate error to caller for error handling in component
      throw e
    }
  }

  const getProductDownloads = async (orderNumber) => {
    if (!productDownloads.value.has(orderNumber)) {
      let results = []
      const files = await axios.$post('/search', {
        filter: {
          ProductID: [orderNumber],
        },
        limit: PDP_DOCUMENT_LIMIT,
        language: language.value,
      })

      if (files && Array.isArray(files.results) && !files.error) {
        results = files.results
      } else {
        logger.error(
          `Error when fetching product downloads '${orderNumber}'. Returning empty array.`,
          files.error
        )
      }
      productDownloads.value.set(orderNumber, results)
    }
    return productDownloads.value.get(orderNumber)
  }

  onLanguageSwitched(() => {
    productDownloads.value = new Map()
  })

  return {
    productDownloads,
    searchResultsCache,
    searchResults,
    searchResultsLoading,
    searchResultsLoadingError,
    getProductDownloads,
    loadByPath,
  }
})
