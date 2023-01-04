import { joinURL } from 'ufo'
import { defineStore } from 'pinia'
import { useRoute, ref, useContext, computed } from '@nuxtjs/composition-api'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { useCmsStore } from '~/stores/cms'
import _pick from 'lodash/pick'
import { useLogger } from '~/composables/useLogger'

export const useCategoryStore = defineStore('category', () => {
  const route = useRoute()
  const cmsStore = useCmsStore()
  const { axios } = useAxiosForHybris()
  const { i18n, localePath } = useContext()
  const { logger } = useLogger('categoryStore')

  let searchTerm = ref('')

  const category = ref(null)
  const result = ref(null)
  const reqId = ref(null)
  const searchSuggestions = ref([])

  const defaultSort = computed(() => {
    return searchTerm.value.length > 0 ? 'relevance' : 'name-asc'
  })

  const currentSuggestions = computed(() => searchSuggestions)

  const breadcrumb = computed(() => {
    const cmsPrefix = cmsStore.breadcrumb.slice(0, 1)
    const categoryPath = category.value?.categoryPath || []
    const rootUrl = localePath('shop-categories')
    const rootCat = { name: i18n.t('category.rootCategory'), href: rootUrl }

    if (!searchTerm.value) {
      return [
        ...cmsPrefix,
        rootCat,
        ...categoryPath.map(({ name, id }) => ({
          name,
          href: joinURL(rootUrl, id),
        })),
      ]
    }

    const term = `${i18n.t('category.searchResult')} "${searchTerm.value}"`
    const searchObj = { href: '', name: term }

    /*
     * maintain categories, deeper than rootCat when search is active
     */
    return [
      ...cmsPrefix,
      ...categoryPath.map(({ name, id }) => ({
        name,
        href: joinURL(rootUrl, id),
      })),
      searchObj,
    ]
  })

  const categoryName = computed(() => breadcrumb.value.at(-1)?.name || '')

  const metaData = computed(() => ({
    title: categoryName.value,
    seoTitle: '',
    seoDescription: '',

    ogTitle: categoryName.value,
    ogDescription: '',
    ogImage: null,

    twitterTitle: categoryName.value,
    twitterDescription: '',
    twitterImage: null,
  }))

  const parentCategoryPath = computed(() => {
    const categoryPath = category.value?.categoryPath || []
    if (categoryPath.length === 0) return null
    if (categoryPath.length === 1) return localePath('shop-categories')

    const idx = categoryPath.length - 2
    return joinURL(localePath('shop-categories'), categoryPath[idx].id)
  })

  const loadProducts = async () => {
    const id = route.value.params.category || ''
    const facets = route.value.query.facets || ''
    const url = joinURL(config.PRODUCTS_API, 'search')
    const term = route.value.query.searchTerm || ''
    searchTerm.value = term
    const sort = route.value.query.sort || defaultSort.value
    const params = {
      currentPage: route.value.query.currentPage - 1 || 0,
      pageSize: 9,
      query: `${term}:${sort}${id ? ':category:' + id : ''}${
        facets ? ':' + facets : ''
      }`,
      ..._pick(route.value.query, 'pageSize'),
      fields: 'FULL',
      categoryTreeDepth: 2,
    }
    result.value = await axios.get(url, { params }).then(({ data }) => data)
  }

  const loadCategory = async () => {
    const id = route.value.params.category || ''
    const url = joinURL(id ? config.CATEGORY_API : config.CATEGORIES_API, id)
    category.value = await axios.get(url).then(({ data }) => data)
  }

  const loadByPath = async () => {
    // if we already loaded the path we just return
    if (route.value.fullPath === reqId.value) return
    reqId.value = route.value.fullPath
    await Promise.all([loadProducts(), loadCategory()])
  }

  // HIER SUGGESTIONS VON API ABFRAGEN
  const getCleanedText = (text) => {
    return text.trim().replace(/\s+/g, ' ')
  }

  const loadSuggestions = async (text) => {
    console.log(text)
    const validText = getCleanedText(text)
    // this.suggestions.items = await searchApi.suggestions(validText, 6)

    try {
      const res = await axios.$get(config.SUGGESTIONS_API, {
        params: { term: validText, fields: 'FULL', max: 3 },
      })
      console.log(res)
      searchSuggestions.value = res.suggestions || []
    } catch (error) {
      logger.error(error)
      searchSuggestions.value = []
    }
  }

  const blurSuggestions = (val) => {
    if (!val) searchSuggestions.value = []
  }

  return {
    // state
    category,
    result,
    searchTerm,
    searchSuggestions,

    // getters
    breadcrumb,
    metaData,
    categoryName,
    parentCategoryPath,
    currentSuggestions,

    // actions
    loadByPath,
    loadSuggestions,
    blurSuggestions,
  }
})
