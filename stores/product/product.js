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
  const accessoriesGroups = ref(null)
  const productAccessoriesPrices = ref(null)
  // TODO: add whilst adding spareparts
  //const productSparepartsPrices = ref(null)
  // TODO: add when adding consumables
  //const productConsumablesPrices = ref(null)
  const productReferences = ref(null)

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

  const getProductReferences = async (id) => {
    const result = await axios.$get(`${config.PRODUCTS_API}/${id}/references`, {
      params: { fields: 'FULL' },
    })
    productReferences.value = result.references
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
      //reset array before fetching new data
      productAccessoriesPrices.value = []

      const resultAccessoriesPrices = await getProductReferenceGroupPrices(
        'ACCESSORIES'
      )

      productAccessoriesPrices.value = resultAccessoriesPrices

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
      addPricesToAccessoriesGroupsItems()
    } else {
      logger.error(
        `Error when fetching product references for '${id}'. Returning empty array.`,
        result.error ? result.error : ''
      )
    }
  }

  /*
   * TODO: uncomment when adding spareparts/ consumables
   * add prices to reference group products
   * can be used for the following reference groups:
   * 'ACCESSORIES', 'CONSUMABLE', 'SPAREPART'

  const addPricesToProductReferenceGroupItems = (
    pricesArr,
    referenceGroupItems
  ) => {
    if (pricesArr.length && referenceGroupItems.length) {
      pricesArr.forEach((productReferenceGroupPrice) => {
        for (const referenceGroupItem of referenceGroupItems) {
          addPriceToObject(referenceGroupItem, productReferenceGroupPrice)
        }
      })
    }
  }
   */

  /**
   * Function to add prices to the items of the accessories groups items
   * IMPORTANT: this function works for the accessoriesGroups only!
   */
  const addPricesToAccessoriesGroupsItems = () => {
    if (
      productAccessoriesPrices.value.length &&
      accessoriesGroups.value.length
    ) {
      productAccessoriesPrices.value.forEach((productAccessoriesPrice) => {
        // accessories groups
        for (const accessoriesGroupGroups of accessoriesGroups.value) {
          if (accessoriesGroupGroups.groups) {
            for (const accessoriesGroup of accessoriesGroupGroups.groups) {
              for (const accessoryItem of accessoriesGroup.references) {
                addPriceToObject(accessoryItem, productAccessoriesPrice)
              }
            }
          }

          // other accessories
          if (
            !accessoriesGroupGroups.groups &&
            accessoriesGroupGroups?.references.length
          ) {
            for (const accessoriesGroup of accessoriesGroupGroups.references) {
              addPriceToObject(accessoriesGroup, productAccessoriesPrice)
            }
          }
        }
      })
    }
  }

  const addPriceToObject = (item, priceItem) => {
    if (item.target?.code === priceItem?.code) {
      item.target.price = priceItem.price
      return
    }
  }

  const getProductReferenceGroupPrices = async (referenceGroup) => {
    const productId = route.value.params.product || ''

    if (!productId) {
      throw new Error('No valid id given in route object.')
    }

    const userStore = useUserStore()

    // don't load product prices if the user is not approved yet
    if (!userStore.isApprovedUser) {
      return []
    }
    const { uid } = userStore.currentUser

    if (!uid) {
      logger.error('No customer id given.')
      return []
    }

    const referenceGroups = [
      'ACCESSORIES',
      'CONSUMABLE',
      'SPAREPART',
      'RECOMMENDEDACCESSORIES',
    ]

    if (!referenceGroups.includes(referenceGroup)) {
      logger.error(
        `Cannot get ${referenceGroup} prices. Referencegroup '${referenceGroup}' not valid.`
      )
      return []
    }

    const result = await axios.$get(
      `${config.PRODUCTS_API}/${productId}/${uid}/referenceGroups/${referenceGroup}/prices`
    )

    if (result.productPrices?.length) {
      return result.productPrices
    }

    logger.error(
      `Error while getting ${referenceGroup} prices for: ${productId}`
    )
    return []
  }

  const recommendedAccessories = computed(() => {
    if (productReferences.value) {
      return productReferences.value.filter(
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

    await Promise.all([
      loadProduct(id),
      loadVariationMatrix(id),
      loadPrice(id),
      getProductReferences(id),
    ])
  }

  return {
    product,
    variationMatrix,
    price,
    accessoriesGroups,
    breadcrumb,
    metaData,
    recommendedAccessories,
    productReferences,
    loadByPath,
    getProducts,
    getProductAccessories,
    getProductReferenceGroupPrices,
  }
})
