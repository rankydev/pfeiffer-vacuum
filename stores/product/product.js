import { defineStore, storeToRefs } from 'pinia'
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
import { useCmsStore } from '~/stores/cms'
import { useVariationmatrixStore } from './variationmatrix'
import { usePricesStore } from './prices'
import { REFERENCE_GROUPS } from './config'

export const useProductStore = defineStore('product', () => {
  const route = useRoute()
  const variationmatrixStore = useVariationmatrixStore()
  const cmsStore = useCmsStore()
  const { logger } = useLogger('productStore')
  const { axios } = useAxiosForHybris()
  const { localePath, i18n } = useContext()
  const pricesStore = usePricesStore()
  const { price, productReferencesPrices } = storeToRefs(pricesStore)

  const product = ref(null)
  const reqId = ssrRef(null)
  const accessoriesGroups = ref([])
  const productReferences = ref([])

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

  const productReferencesSpareParts = computed(() => {
    return getReferenceGroupWithPrices(REFERENCE_GROUPS.SPAREPART)
  })

  const productReferencesConsumables = computed(() => {
    return getReferenceGroupWithPrices(REFERENCE_GROUPS.CONSUMABLE)
  })

  const productReferencesRecommendedAccessories = computed(() => {
    return getReferenceGroupWithPrices(REFERENCE_GROUPS.RECOMMENDEDACCESSORIES)
  })

  const productAccessoriesGroups = computed(() => {
    if (!productReferencesPrices.value || !accessoriesGroups.value) {
      return []
    }

    return accessoriesGroups.value.map((accessoriesGroup) => {
      if (!accessoriesGroup.groups && !accessoriesGroup.references) return
      if (accessoriesGroup.groups) {
        const groupsArr = accessoriesGroup.groups.map((group) => {
          return {
            name: group?.name ? group?.name : '',
            references: getReferencesWithMappedPrices(group.references),
          }
        })
        return {
          name: accessoriesGroup?.name ? accessoriesGroup?.name : '',
          groups: groupsArr,
        }
      }

      if (accessoriesGroup.references) {
        return {
          name: accessoriesGroup?.name ? accessoriesGroup?.name : '',
          references: getReferencesWithMappedPrices(
            accessoriesGroup.references
          ),
        }
      }
    })
  })

  const productType = computed(() => product.value?.productType || '')

  const getReferenceGroupWithPrices = (type) => {
    if (!productReferences.value || !type) {
      return []
    }

    return getReferencesWithMappedPrices(
      productReferences.value.filter((o) => o.referenceType === type)
    )
  }

  const getReferencesWithMappedPrices = (references) => {
    if (!references) {
      return []
    }

    return references.map((item) => {
      const foundPrice = productReferencesPrices.value?.find((priceItem) => {
        return priceItem.code === item.target.code
      })
      if (foundPrice) {
        return {
          ...item,
          target: {
            ...item.target,
            price: foundPrice.price,
          },
        }
      }
      return item
    })
  }

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
  }

  const loadProductReferences = async (id) => {
    //reset array before fetching new data
    productReferences.value = null

    const result = await axios.$get(`${config.PRODUCTS_API}/${id}/references`, {
      params: { fields: 'FULL' },
    })

    if (result?.references?.length) {
      productReferences.value = result.references
    }
  }

  const loadProductAccessories = async () => {
    const id = route.value.params.product || ''

    if (!id) {
      throw new Error('No valid id given in route object.')
    }

    accessoriesGroups.value = null

    const result = await axios.$get(
      `${config.PRODUCTS_API}/${id}/referenceGroups/${REFERENCE_GROUPS.ACCESSORIES}`,
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
        `Error when fetching product accessories for '${id}'. Returning empty array.`,
        result.error ? result.error : ''
      )
    }
  }

  const hydrateVariationMatrix = async () => {
    // When product is type master or variant, save master id for matrix
    if (
      ['MASTERPRODUCT', 'VARIANTPRODUCT'].includes(product.value?.productType)
    ) {
      variationmatrixStore.currentMasterId =
        product.value.productType === 'MASTERPRODUCT'
          ? product.value.code
          : product.value.master
      variationmatrixStore.currentVariantId =
        product.value.productType === 'MASTERPRODUCT'
          ? null
          : product.value.code
    }

    await variationmatrixStore.loadVariationMatrix()
  }

  const loadByPath = async () => {
    const id = route.value.params.product || ''

    if (!id) {
      throw new Error('No valid id given in route object.')
    }

    // if we not already loaded the path we pull all required data
    // using path instead of fullpath to allow page caching for same product page but with anchor tags f.e. for "#variantselection"
    if (route.value.path !== reqId.value) {
      reqId.value = route.value.path

      // Resetting the product before we start to load a new product to make sure old data won't be shown during loading
      product.value = null

      await Promise.all([
        loadProduct(id),
        loadProductReferences(id),
        loadProductAccessories(),
      ])

      await pricesStore.loadPrice(id)

      await Promise.all([
        // we need to wait until loadProduct is done before we can load the matrix
        // load every time even if product is cached. Because matrix gets cleared after each product page leave
        hydrateVariationMatrix(),
        // needs to be called even if product data was already loaded (SSR) because prices can only be loaded client side
        pricesStore.loadProductReferenceGroupsPrices(),
      ])
    }

    return {
      breadcrumb,
      metaData,

      // Product
      product,
      productType,
      price,
      accessoriesGroups,
      productAccessoriesGroups,
      loadProductReferenceGroupsPrices:
        pricesStore.loadProductReferenceGroupsPrices,
      productReferences, // please note: this NEEDS to be exported, even though it is not used outside. Dependent computeds below will not work if removed. This may be a pinia bug.
      productReferencesPrices,
      productReferencesSpareParts,
      productReferencesConsumables,
      productReferencesRecommendedAccessories,
      getProducts,
      loadByPath,
      loadProductAccessories,
    }
  }
})
