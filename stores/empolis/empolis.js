import { defineStore } from 'pinia'
import { ref, useContext, useRoute } from '@nuxtjs/composition-api'
import { useAxiosForEmpolis } from '~/composables/useAxiosForEmpolis'
import { useLanguageSwitch } from '~/composables/useLanguageSwitch'

const PDP_DOCUMENT_LIMIT = 500

export const useEmpolisStore = defineStore('empolis', () => {
  const productDownloads = ref(new Map())
  const searchResults = ref(null)
  const searchResultsLoading = ref(false)
  const searchResultsLoadingError = ref(false)

  const route = useRoute()
  const { axios } = useAxiosForEmpolis()
  const { i18n } = useContext()
  const { onLanguageSwitched } = useLanguageSwitch()

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
        console.error(
          `Error when fetching product downloads '${orderNumber}'. Returning empty array.`,
          files.error
        )
      }
      productDownloads.value.set(orderNumber, results)
    }
    return productDownloads.value.get(orderNumber)
  }

  const loadByPath = async () => {
    const term = route.value.query.searchTerm || ''
    const currentPage = Number(route.value.query.currentPage || 1)
    const pageSize = Number(route.value.query.pageSize || 9)

    // TODO: grep filter options here later, too. [PVWEB-550]
    await fetchSearchResults({
      text: term,
      offset: (currentPage - 1) * pageSize,
      limit: pageSize,
    })
  }

  const fetchSearchResults = async (searchOptions = {}) => {
    // composing final search options by overriding defaults with (optional) custom options
    const options = {
      text: '',
      filter: {},
      offset: 0,
      limit: 9,
      ...searchOptions,
      language: i18n.locale === 'de' ? 'de' : 'en',
    }

    searchResultsLoading.value = true
    searchResultsLoadingError.value = false

    try {
      const files = await axios.$post('/search', options)

      // successful search. set store and resolve promise successfully by returning
      if (files && Array.isArray(files.results) && !files.error) {
        searchResults.value = files
        return
      }

      // empolis search error
      if (files.error) {
        throw files.error
      }
      // unknown error
      throw 'wrong empolis response schema'
    } catch (e) {
      console.error(
        `Error when fetching empolis search results for '${
          options.text ? options.text : ''
        }'.`,
        e ? e : ''
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

  return {
    productDownloads,
    searchResults,
    searchResultsLoading,
    searchResultsLoadingError,
    getProductDownloads,
    loadByPath,
  }
})
