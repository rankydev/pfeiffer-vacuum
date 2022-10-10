import { joinURL } from 'ufo'
import { defineStore } from 'pinia'
import {
  useRouter,
  useRoute,
  ref,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import config from '~/config/hybris.config'
import { PATH_SHOP } from '~/server/constants'
import { useCmsStore } from '~/stores/cms'

import _pick from 'lodash/pick'

export const useCategoryStore = defineStore('category', () => {
  const router = useRouter()
  const route = useRoute()
  const cmsStore = useCmsStore()
  const { $axios, i18n, app } = useContext()

  const basePath = joinURL(router.options.base, PATH_SHOP)

  const category = ref(null)
  const result = ref(null)
  const reqId = ref(null)

  const breadcrumb = computed(() => {
    const cmsPrefix = cmsStore.breadcrumb.slice(0, 2)
    const categoryPath = category.value?.categoryPath || []

    return [
      ...cmsPrefix,
      ...categoryPath.map(({ name, id }) => ({
        name,
        href: joinURL(app.localePath('shop-categories'), id),
      })),
    ]
  })

  const categoryName = computed(() => breadcrumb.value.at(-1)?.name)

  const parentCategoryPath = computed(() => {
    const categoryPath = category.value?.categoryPath || []
    if (categoryPath.length === 0) return null
    if (categoryPath.length === 1) return app.localePath('shop-categories')

    const idx = categoryPath.length - 2
    return joinURL(app.localePath('shop-categories'), categoryPath[idx].id)
  })

  const loadProducts = async () => {
    const id = route.value.params.category || ''
    const sort = route.value.query.sort || 'name-asc'
    const url = joinURL(basePath, config.PRODUCTS_API, 'search')
    const params = {
      currentPage: 0,
      pageSize: 9,
      //TODO: Facet filter need to merge with the query
      query: `:${sort}${id ? ':category:' + id : ''}`,
      ..._pick(route.value.query, ['currentPage', 'pageSize']),
      lang: i18n.locale,
      curr: 'EUR',
      fields: 'FULL',
      categoryTreeDepth: 2,
    }
    result.value = await $axios.get(url, { params }).then(({ data }) => data)
  }

  const loadCategory = async () => {
    const id = route.value.params.category || ''
    const url = joinURL(
      basePath,
      id ? config.CATEGORY_API : config.CATEGORIES_API,
      id
    )
    const params = { lang: i18n.locale, curr: 'EUR' }
    category.value = await $axios.get(url, { params }).then(({ data }) => data)
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

    // getters
    breadcrumb,
    categoryName,
    parentCategoryPath,

    // actions
    loadByPath,
  }
})
