import { joinURL } from 'ufo'
import { defineStore } from 'pinia'
import {
  useRoute,
  ref,
  useContext,
  computed,
  onBeforeMount,
  onServerPrefetch,
  watch,
} from '@nuxtjs/composition-api'
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

  const categoryTree = ref([])
  const category = ref(null)
  const result = ref(null)
  const reqId = ref(null)
  const searchSuggestions = ref([])

  const defaultSort = computed(() => {
    return searchTerm.value.length > 0 ? 'relevance' : 'name-asc'
  })

  const currentSuggestions = computed(() => searchSuggestions)

  const navigationIsSearchPage = computed(() => {
    return route.value.path.includes('/shop/search')
  })

  const rootUrl = computed(() => {
    return localePath(
      navigationIsSearchPage.value ? 'shop-search' : 'shop-categories'
    )
  })

  const breadcrumb = computed(() => {
    const cmsPrefix = cmsStore.breadcrumb.slice(0, 1)
    const categoryPath = category.value?.categoryPath || []
    const rootCat = {
      name: i18n.t('category.rootCategory'),
      href: rootUrl.value,
    }

    if (!searchTerm.value) {
      return [
        ...cmsPrefix,
        rootCat,
        ...categoryPath.map(({ name, id }) => ({
          name,
          href: joinURL(rootUrl.value, id),
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
        href: joinURL(rootUrl.value, id),
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
    if (categoryPath.length === 1) return rootUrl.value

    const idx = categoryPath.length - 2
    return joinURL(rootUrl.value, categoryPath[idx].id)
  })

  const categoryTreeNavigationEntries = computed(() =>
    categoryTree.value.map((parent) => ({
      component: 'MainNavLinkLevel1',
      level: 1,
      href: joinURL(localePath('shop-categories'), parent.category?.id),
      label: parent.category?.name,
      target: '_self',
      navigationEntries: parent.children.map((child) => ({
        component: 'MainNavLinkLevel2',
        level: 2,
        href: joinURL(localePath('shop-categories'), child.category?.id),
        label: child.category?.name || '',
        target: '_self',
      })),
    }))
  )

  const loadCategoryTree = async () => {
    const res = await axios.get(joinURL(config.PRODUCTS_API, 'search'), {
      params: { fields: 'FULL', categoryTreeDepth: 2 },
    })
    categoryTree.value = res.data?.categorySubtree || []
  }

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

  const getCleanedText = (text) => {
    return text.trim().replace(/\s+/g, ' ')
  }

  const loadSuggestions = async (text) => {
    const validText = getCleanedText(text)

    try {
      const res = await axios.$get(config.SUGGESTIONS_API, {
        params: { term: validText, fields: 'FULL', max: 3 },
      })
      searchSuggestions.value = res.suggestions || []
    } catch (error) {
      logger.error(error)
      searchSuggestions.value = []
    }
  }

  const blurSuggestions = (val) => {
    if (!val) searchSuggestions.value = []
  }

  onBeforeMount(loadCategoryTree)
  onServerPrefetch(loadCategoryTree)
  watch(route, loadCategoryTree)

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
    rootUrl,
    categoryTreeNavigationEntries,

    // actions
    loadByPath,
    loadSuggestions,
    blurSuggestions,
    loadCategoryTree,
  }
})
