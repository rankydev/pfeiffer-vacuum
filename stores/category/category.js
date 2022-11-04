import { joinURL } from 'ufo'
import { defineStore } from 'pinia'
import { useRoute, ref, useContext, computed } from '@nuxtjs/composition-api'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { useCmsStore } from '~/stores/cms'
import _pick from 'lodash/pick'

export const useCategoryStore = defineStore('category', () => {
  const route = useRoute()
  const cmsStore = useCmsStore()
  const { axios } = useAxiosForHybris()
  const { i18n, localePath } = useContext()

  let searchTerm = ref('')

  const category = ref(null)
  const result = ref(null)
  const reqId = ref(null)

  const defaultSort = computed(() => {
    return searchTerm.value.length > 0 ? 'relevance' : 'name-asc'
  })

  const breadcrumb = computed(() => {
    const cmsPrefix = cmsStore.breadcrumb.slice(0, 1)
    const categoryPath = category.value?.categoryPath || []
    const rootUrl = localePath('shop-categories')
    const rootCat = { name: i18n.t('category.rootCategory'), href: rootUrl }

    const breadcrumbArr = [
      ...cmsPrefix,
      rootCat,
      ...categoryPath.map(({ name, id }) => ({
        name,
        href: joinURL(rootUrl, id),
      })),
    ]

    if (searchTerm.value) {
      const term = `${i18n.t('category.searchResult')} "${searchTerm.value}"`
      breadcrumbArr.push({ href: '', name: term })
    }

    return breadcrumbArr
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

  return {
    // state
    category,
    result,
    searchTerm,

    // getters
    breadcrumb,
    metaData,
    categoryName,
    parentCategoryPath,

    // actions
    loadByPath,
  }
})
