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
  const activeFilters = ref(null)
  const availableFilters = ref(null)
  const searchResultsLoading = ref(false)
  const searchResultsLoadingError = ref(false)
  const searchSuggestions = ref([])

  const filterSuggestions = ref(null)
  const filterSuggestionsCache = ref(new Map())

  const { logger } = useLogger('empolisStore')
  const route = useRoute()
  const { axios } = useAxiosForEmpolis()
  const { i18n } = useContext()
  const { onLanguageSwitched } = useLanguageSwitch()

  const language = computed(() => {
    return i18n.locale === 'de' ? 'de' : 'en'
  })

  const loadByPath = async () => {
    // setup search parameters
    const term = route.value.query.searchTerm || ''
    const currentPage = Number(route.value.query.currentPage || 1)
    const pageSize = Number(route.value.query.pageSize || PAGE_SIZE_DEFAULT)

    // load filterSuggestions with "annotateText". Do not wait for the answer since its not relevant for the following requests
    loadFilterSuggestions(term)

    // first check if we have cached results for this url (includes all filters, pageSize, ...)
    const cacheKey = route.value.fullPath
    const usedCache = setSearchResultsByCacheKey(cacheKey)
    // if we used cache successful no new loading required and we exit this function
    if (usedCache) return

    const filtersFromQuery = route.value.query.filter
      ? JSON.parse(decodeURIComponent(route.value.query.filter.toString()))
      : {}

    searchResultsLoading.value = true
    searchResultsLoadingError.value = false

    try {
      // first get translates filters
      const activeFiltersRes = await getTranslatedFilters(filtersFromQuery)

      // then fetch all available filters dependent on the current items
      const availableFiltersRes = await getFilterItems(
        filtersFromQuery,
        activeFiltersRes
      )

      const searchResultsRes = await fetchSearchResults({
        text: term,
        filter: filtersFromQuery,
        offset: (currentPage - 1) * pageSize,
        limit: pageSize,
      })

      searchResultsCache.value.set(cacheKey, {
        searchResults: searchResultsRes,
        activeFilters: activeFiltersRes,
        availableFilters: availableFiltersRes,
      })

      // since we created our cache entry above we can now safely set results by cache
      setSearchResultsByCacheKey(cacheKey)
    } catch (e) {
      logger.error(e)
      resetAllSearchResults()
      searchResultsLoadingError.value = true
    } finally {
      searchResultsLoading.value = false
    }
  }

  const resetAllSearchResults = () => {
    searchResults.value = null
    activeFilters.value = null
    availableFilters.value = null
  }

  const setSearchResultsByCacheKey = (cacheKey) => {
    if (searchResultsCache.value.has(cacheKey)) {
      const cacheEntry = searchResultsCache.value.get(cacheKey)
      searchResults.value = cacheEntry.searchResults
      activeFilters.value = cacheEntry.activeFilters
      availableFilters.value = cacheEntry.availableFilters
      return true
    }
    return false
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
      throw result.error || 'unknown error'
    } catch (e) {
      logger.error(
        'Error when translating filterObject. Returning empty array.',
        e ? e : ''
      )
      return []
    }
  }

  const getFilterItems = async (filters, activeFiltersArray) => {
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
        for (let i = 0; i < activeFiltersArray.length; i++) {
          for (let k = 0; k < activeFiltersArray[i].concepts.length; k++) {
            activeFiltersString.push(activeFiltersArray[i].concepts[k].id)
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

      throw result.error || 'unknown error'
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

      throw files.error || 'wrong empolis response schema'
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

  const loadFilterSuggestions = async (searchTerm) => {
    const cacheKey = `${language.value}_${searchTerm}`

    if (!filterSuggestionsCache.value.has(cacheKey)) {
      try {
        const result = await axios.$post('/annotate', {
          text: searchTerm,
          language: language.value,
        })

        if (result && Array.isArray(result) && !result.error) {
          filterSuggestionsCache.value.set(cacheKey, result)
        } else {
          throw result.error || 'unknown error'
        }
      } catch (e) {
        logger.error(
          `Error when fetching results for '${searchTerm}'. Returning empty array.`,
          e ? e : ''
        )
        filterSuggestionsCache.value.set(cacheKey, [])
      }
    }

    filterSuggestions.value = filterSuggestionsCache.value.get(cacheKey) || []
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

  const fetchDocumentSuggestions = async (text, maxCount = 6) => {
    try {
      const suggestions = await axios.$post('/suggest', {
        query: text,
        maxCount,
        language: language.value,
      })

      if (suggestions && Array.isArray(suggestions) && !suggestions.error) {
        return suggestions
      }

      logger.error(
        `Error when fetching suggestions for '${text}'. Returning empty array.`,
        suggestions.error ? suggestions.error : ''
      )
      return []
    } catch (e) {
      logger.error(
        `Error when fetching suggestions for '${text}'. Returning empty array.`,
        e ? e : ''
      )
      return []
    }
  }

  return {
    productDownloads,
    searchResultsCache,
    searchResults,
    activeFilters,
    availableFilters,
    searchResultsLoading,
    searchResultsLoadingError,
    filterSuggestions,
    getProductDownloads,
    loadByPath,
    fetchDocumentSuggestions,
    searchSuggestions,
  }
})
