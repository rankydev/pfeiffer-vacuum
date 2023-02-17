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
  const searchSuggestions = ref([])
  const { logger } = useLogger('empolisStore')

  const route = useRoute()
  const { axios } = useAxiosForEmpolis()
  const { i18n } = useContext()
  const { onLanguageSwitched } = useLanguageSwitch()

  const language = computed(() => {
    return i18n.locale === 'de' ? 'de' : 'en'
  })

  const getProductDownloads = async (orderNumber) => {
    if (!productDownloads.value.has(orderNumber)) {
      let results = []
      const files = await axios.$post('/search', {
        filter: {
          ProductID: [orderNumber],
        },
        limit: PDP_DOCUMENT_LIMIT,
        language: i18n.locale === 'de' ? 'de' : 'en',
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

  const loadByPath = async () => {
    // first check if we have cached results for this url (includes all filters, pageSize, ...)
    const cacheKey = route.value.fullPath
    if (searchResultsCache.value.has(cacheKey)) {
      searchResults.value = searchResultsCache.value.get(cacheKey)
      return
    }

    // load search results by query if not found in cache
    const term = route.value.query.searchTerm || ''
    const currentPage = Number(route.value.query.currentPage || 1)
    const pageSize = Number(route.value.query.pageSize || PAGE_SIZE_DEFAULT)

    try {
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
      language: i18n.locale === 'de' ? 'de' : 'en',
    }

    searchResultsLoading.value = true
    searchResultsLoadingError.value = false

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
      searchResults.value = null
      searchResultsLoadingError.value = true
      // propagate error to caller for error handling in component
      throw e
    } finally {
      searchResultsLoading.value = false
    }
  }

  onLanguageSwitched(() => {
    productDownloads.value = new Map()
  })

  const fetchDocumentSuggestions = async (text, maxCount = 3) => {
    try {
      const suggestions = await axios.$post('/suggest', {
        query: text,
        maxCount,
        language,
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
    searchResultsLoading,
    searchResultsLoadingError,
    getProductDownloads,
    loadByPath,
    fetchDocumentSuggestions,
    searchSuggestions,
  }
})
