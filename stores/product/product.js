import { defineStore } from 'pinia'
import {
  ssrRef,
  ref,
  useRoute,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import { useLogger } from '~/composables/useLogger'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { joinURL } from 'ufo'
import { useUserStore } from '~/stores/user'
import { useCmsStore } from '~/stores/cms'

export const useProductStore = defineStore('product', () => {
  const route = useRoute()
  const cmsStore = useCmsStore()
  const { logger } = useLogger('productStore')
  const { axios } = useAxiosForHybris()
  const { localePath, i18n } = useContext()

  const product = ref(null)
  const reqId = ssrRef(null)
  const variationMatrix = ref(null)
  const price = ref(null)
  const accessories = ref(null)

  const breadcrumb = computed(() => {
    const cmsPrefix = cmsStore.breadcrumb.slice(0, 1)
    const categoryPath = product.value?.categoryPath || []
    const rootUrl = localePath('shop-categories')
    const rootCat = { name: i18n.t('category.rootCategory'), href: rootUrl }
    const productName = product.value?.name

    return [
      ...cmsPrefix,
      rootCat,
      ...categoryPath.map(({ name, id }) => ({
        name,
        href: joinURL(rootUrl, id),
      })),
      ...(productName ? [{ name: productName }] : []),
    ]
  })

  const metaData = computed(() => ({
    title: product.value?.name || '',
    seoTitle: '',
    seoDescription: '',

    ogTitle: product.value?.name || '',
    ogDescription: '',
    ogImage: null,

    twitterTitle: product.value?.name || '',
    twitterDescription: '',
    twitterImage: null,
  }))

  const getProducts = async (ids) => {
    if (!Array.isArray(ids)) {
      logger.error(
        'Array expected when fetching multiple products. No valid ids given.'
      )
      return []
    }

    const idsString = ids.join()
    const result = await axios
      .$get(config.PRODUCTS_API, {
        params: { codes: idsString, fields: 'FULL' },
      })
      .catch((error) => {
        logger.error(error.toJSON())
      })

    if (!Array.isArray(result?.products)) {
      logger.error(
        `Array expected when fetching multiple products '${idsString}', returning empty array.`
      )
      return []
    }

    return result.products
  }

  const loadProduct = async (id) => {
    const url = joinURL(config.PRODUCTS_API, id)
    const result = await axios.$get(url, {
      params: { fields: 'FULL' },
    })
    product.value = result
  }

  const loadVariationMatrix = async (id) => {
    const url = joinURL(config.PRODUCTS_API, id, 'variationmatrix')
    const result = await axios.$get(url, {
      params: { fields: 'FULL' },
    })
    variationMatrix.value = result
  }

  const loadPrice = async (id) => {
    const userStore = useUserStore()

    // don't load product prices if the user is not approved yet
    if (!userStore.isApprovedUser) {
      return
    }

    const { uid } = userStore.currentUser
    const url = joinURL(config.PRODUCTS_API, id, uid, 'price')
    const result = await axios.$get(url, {
      params: { fields: 'FULL' },
    })
    price.value = result
  }

  const getProductAccessories = async () => {
    const id = route.value.params.product || ''

    if (!id) {
      throw new Error('No valid id given in route object.')
    }

    const result = await axios.$get(
      `${config.PRODUCTS_API}/${id}/referenceGroups/ACCESSORIES`,
      { params: { fields: 'FULL' } }
    )

    if (
      typeof result === 'object' &&
      !result.error &&
      result.references?.length > 0
    ) {
      accessories = result.references
    } else {
      logger.error(
        `Error when fetching product references for '${id}'. Returning empty array.`,
        result.error ? result.error : ''
      )
    }
  }

  const loadByPath = async () => {
    const id = route.value.params.product || ''

    if (!id) {
      throw new Error('No valid id given in route object.')
    }

    // if we already loaded the product we just return
    // using product id instead of fullpath to allow page caching for same product page but with anchor tags f.e. for "#variantselection"
    if (id === reqId.value) return
    reqId.value = id

    // Resetting the product before we start to load a new product to make sure old data won't be shown during loading
    product.value = null

    await Promise.all([loadProduct(id), loadVariationMatrix(id), loadPrice(id)])
  }

  return {
    product,
    variationMatrix,
    price,
    accessories,
    breadcrumb,
    metaData,
    loadByPath,
    getProducts,
    getProductAccessories,
  }
})
