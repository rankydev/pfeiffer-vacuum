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
import { useUserStore } from '~/stores/user'
import { useCmsStore } from '~/stores/cms'
import { useVariationmatrixStore } from './variationmatrix'

export const useProductStore = defineStore('product', () => {
  const route = useRoute()
  const variationmatrixStore = useVariationmatrixStore()
  const cmsStore = useCmsStore()
  const { logger } = useLogger('productStore')
  const { axios } = useAxiosForHybris()
  const { localePath, i18n } = useContext()

  const product = ref(null)
  const reqId = ssrRef(null)
  const price = ref(null)
  const accessoriesGroups = ref(null)
  const productAccessoriesPrices = ref(null)
  const productReferences = ref(null)
  const productReferencesPrices = ref(null)

  const userStore = useUserStore()
  const { isApprovedUser, currentUser } = storeToRefs(userStore)

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

  const getReferenceGroupWithPrices = (type) => {
    if (!productReferences.value) {
      return []
    }

    return productReferences.value
      .filter((o) => o.referenceType === type)
      .map((item) => {
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

  const productReferencesSpareParts = computed(() => {
    return getReferenceGroupWithPrices('SPAREPART')
  })

  const productReferencesConsumables = computed(() => {
    return getReferenceGroupWithPrices('CONSUMABLE')
  })

  const productReferencesRecommendedAccessories = computed(() => {
    return getReferenceGroupWithPrices('RECOMMENDEDACCESSORIES')
  })

  const productAccessoriesGroups = computed(() => {
    if (productAccessoriesPrices.value && accessoriesGroups.value) {
      return accessoriesGroups.value.map((accessoriesGroup) => {
        if (!accessoriesGroup.groups && !accessoriesGroup.references) return
        if (accessoriesGroup.groups) {
          const groupsArr = accessoriesGroup.groups.map((group) => {
            const itemsArr = group.references.map((accessoryItem) => {
              const priceArr = productAccessoriesPrices.value.filter(
                (priceObj) => accessoryItem.target?.code === priceObj?.code
              )

              if (priceArr.length)
                accessoryItem.target.price = priceArr[0].price

              return accessoryItem
            })
            return {
              name: group?.name ? group?.name : '',
              references: itemsArr,
            }
          })
          return {
            name: accessoriesGroup?.name ? accessoriesGroup?.name : '',
            groups: groupsArr,
          }
        }

        if (accessoriesGroup.references) {
          const itemsArr = accessoriesGroup.references.map((accessoryItem) => {
            const priceArr = productAccessoriesPrices.value.filter(
              (priceObj) => accessoryItem.target?.code === priceObj?.code
            )

            if (priceArr.length) accessoryItem.target.price = priceArr[0].price

            return accessoryItem
          })
          return {
            name: accessoriesGroup?.name ? accessoriesGroup?.name : '',
            references: itemsArr,
          }
        }
      })
    }

    return []
  })

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
      variationmatrixStore.currentMasterId =
        result.productType === 'MASTERPRODUCT' ? result.code : result.master
      variationmatrixStore.currentVariantId =
        result.productType === 'MASTERPRODUCT' ? null : result.code
    }
  }

  const loadPrice = async (id) => {
    // don't load product prices if the user is not approved yet
    if (!isApprovedUser.value) {
      return
    }

    const { uid } = currentUser.value
    const url = joinURL(config.PRODUCTS_API, id, uid, 'price')
    const result = await axios.$get(url, {
      params: { fields: 'FULL' },
    })
    price.value = result
  }

  const loadProductReferenceGroupsPrices = async () => {
    // don't load prices if the user is not approved yet
    if (!isApprovedUser.value) return

    // don't load prices if the product hasn't consumables, or spare parts
    if (
      !productReferencesSpareParts.value.length &&
      !productReferencesConsumables.value.length &&
      !productReferencesRecommendedAccessories.value.length
    )
      return

    productReferencesPrices.value = []

    const referenceGroupsToLoad = [
      'CONSUMABLE',
      'SPAREPART',
      'RECOMMENDEDACCESSORIES',
    ]

    for (const referenceGroup of referenceGroupsToLoad) {
      const resultPrices = await getProductReferenceGroupPrices(referenceGroup)

      if (resultPrices.length && !resultPrices.error) {
        productReferencesPrices.value = [
          ...productReferencesPrices.value,
          ...resultPrices,
        ]
      } else {
        logger.error(
          `Error when fetching product consumables. Returning empty array.`,
          resultPrices.error ? resultPrices.error : ''
        )
      }
    }
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
    } else {
      logger.error(
        `Error when fetching product accessories for '${id}'. Returning empty array.`,
        result.error ? result.error : ''
      )
    }
  }

  const getProductReferenceGroupPrices = async (referenceGroup) => {
    const productId = route.value.params.product || ''

    if (!productId) {
      throw new Error('No valid id given in route object.')
    }

    // don't load product prices if the user is not approved yet
    if (!isApprovedUser.value) {
      return []
    }
    const { uid } = currentUser.value

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
      variationmatrixStore.loadVariationMatrix(id),
      loadPrice(id),
      loadProductReferences(id),
    ])
  }

  return {
    breadcrumb,
    metaData,

    // Product
    product,
    price,
    accessoriesGroups,
    productAccessoriesGroups,
    getProducts,
    loadProductReferenceGroupsPrices,
    productReferences, // please note: this NEEDS to be exported, even though it is not used outside. Dependent computeds below will not work if removed. This may be a pinia bug.
    productReferencesPrices,
    productReferencesSpareParts,
    productReferencesConsumables,
    productReferencesRecommendedAccessories,
    loadByPath,
    loadProductAccessories,
    getProductReferenceGroupPrices,
  }
})
