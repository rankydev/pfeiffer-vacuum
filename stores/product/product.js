import { defineStore } from 'pinia'
import {
  ssrRef,
  ref,
  useRoute,
  useRouter,
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
  const router = useRouter()
  const cmsStore = useCmsStore()
  const { logger } = useLogger('productStore')
  const { axios } = useAxiosForHybris()
  const { localePath, i18n } = useContext()

  const product = ref(null)
  const currentMasterId = ref(null)
  const currentVariantId = ref(null)
  const shouldLoadVariantMatrix = ref(false)
  const matrixStillValid = ref(false)
  const initialMatrixLoad = ref(true)
  const reqId = ssrRef(null)
  const price = ref(null)
  const accessoriesGroups = ref(null)
  const variationMatrix = ref(null)
  const selectedAttributes = ref({})

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

  /*
   * VARIANT SELECTION START
   */

  const loadVariationMatrix = async (id) => {
    // Return when old matrix is still valid
    if (matrixStillValid.value) {
      matrixStillValid.value = false
      return
    }

    // Check if matrix is requested for the first time
    if (variationMatrix.value) initialMatrixLoad.value = false

    // Check if variant specific matrix should be loaded
    if (
      !hasOnlyOneVariantLeft(variationMatrix.value) &&
      currentVariantId.value &&
      !currentMasterId.value
    ) {
      shouldLoadVariantMatrix.value = true
    }

    const productCode = shouldLoadVariantMatrix.value
      ? currentVariantId.value
      : currentMasterId.value || id

    // Get variationmatrix from hybris
    let result
    const url = joinURL(config.PRODUCTS_API, productCode, 'variationmatrix')
    result = await axios.$get(url, {
      params: { ...selectedAttributes.value, fields: 'FULL' },
    })
    variationMatrix.value = result

    // Redirect to variant page when only one variant is left
    if (hasOnlyOneVariantLeft(result) && !initialMatrixLoad.value) {
      router.push(
        joinURL(
          localePath('shop-products-product'),
          variationMatrix.value.variants[0]?.code
        )
      )
      matrixStillValid.value = true
    }

    // Set selected attributes as user selection for first variant loading
    if (result.allSelected && !Object.keys(selectedAttributes.value).length)
      setHybrisSelectionAsUserInput()
    shouldLoadVariantMatrix.value = false
  }

  const toggleAttribute = (key, val) =>
    key in selectedAttributes.value && selectedAttributes.value[key] === val
      ? deleteAttribute(key)
      : addAttribute(key, val)

  const addAttribute = async (key, val) => {
    selectedAttributes.value[key] = val
    await loadVariationMatrix()
  }
  const deleteAttribute = async (key) => {
    delete selectedAttributes.value[key]
    await loadVariationMatrix()
  }

  const clearMatrix = () => {
    // Do not clear when matrix should be still valid
    if (matrixStillValid.value) return

    currentMasterId.value = null
    currentVariantId.value = null
    variationMatrix.value = null
    selectedAttributes.value = {}
  }

  const setHybrisSelectionAsUserInput = () => {
    variationMatrix.value.variationAttributes?.forEach((el) => {
      selectedAttributes.value[el.code] = el.variationValues.find(
        (e) => e.selected
      ).value
    })
  }

  const hasOnlyOneVariantLeft = (matrix) => matrix?.variants?.length === 1

  /*
   * VARIANT SELECTION END
   */

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
        logger.error(error)
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

    // When product is type master or variant, save master id for matrix
    if (['MASTERPRODUCT', 'VARIANTPRODUCT'].includes(result.productType)) {
      currentMasterId.value =
        result.productType === 'MASTERPRODUCT' ? result.code : result.master
      currentVariantId.value =
        result.productType === 'MASTERPRODUCT' ? null : result.code
    }
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

    // reset accessories when loading new ones. Makes sure to not display old product data
    accessoriesGroups.value = null

    const result = await axios.$get(
      `${config.PRODUCTS_API}/${id}/referenceGroups/ACCESSORIES`,
      { params: { fields: 'FULL' } }
    )

    if (typeof result === 'object' && !result.error) {
      if (!Array.isArray(result.groups)) {
        result.groups = []
      }

      if (result.references?.length > 0) {
        result.groups.push({
          name: i18n.t('product.otherAccessories'),
          references: result.references,
        })
      }

      accessoriesGroups.value = result.groups
    } else {
      logger.error(
        `Error when fetching product references for '${id}'. Returning empty array.`,
        result.error ? result.error : ''
      )
    }
  }

  const recommendedAccessories = computed(() => {
    if (product.value && product.value.productReferences) {
      return product.value.productReferences.filter(
        (o) => o.referenceType === 'RECOMMENDEDACCESSORIES'
      )
    }
    return []
  })

  const loadByPath = async () => {
    const id = route.value.params.product || ''

    if (!id) {
      throw new Error('No valid id given in route object.')
    }

    // if we already loaded the path we just return
    // using path instead of fullpath to allow page caching for same product page but with anchor tags f.e. for "#variantselection"
    if (route.value.path === reqId.value) return
    reqId.value = route.value.path

    // Resetting the product before we start to load a new product to make sure old data won't be shown during loading
    product.value = null

    await Promise.all([loadProduct(id), loadPrice(id)])
  }

  return {
    breadcrumb,
    metaData,

    // Product
    product,
    price,
    accessoriesGroups,
    recommendedAccessories,
    loadByPath,
    getProducts,
    getProductAccessories,

    // Variant selection
    variationMatrix,
    currentMasterId,
    currentVariantId,
    selectedAttributes,
    loadVariationMatrix,
    addAttribute,
    deleteAttribute,
    toggleAttribute,
    clearMatrix,
  }
})
