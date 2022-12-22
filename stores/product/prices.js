import { defineStore, storeToRefs } from 'pinia'
import { ref, useRoute } from '@nuxtjs/composition-api'
import { useLogger } from '~/composables/useLogger'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { joinURL } from 'ufo'
import { useUserStore } from '~/stores/user'

export const usePricesStore = defineStore('prices', () => {
  const route = useRoute()
  const { logger } = useLogger('productStore')
  const { axios } = useAxiosForHybris()

  const price = ref(null)
  const productReferencesPrices = ref([])

  const userStore = useUserStore()
  const { isApprovedUser, currentUser } = storeToRefs(userStore)

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

    productReferencesPrices.value = []

    const referenceGroupsToLoad = [
      'ACCESSORIES',
      'CONSUMABLE',
      'SPAREPART',
      'RECOMMENDEDACCESSORIES',
    ]

    const loadedPrices = referenceGroupsToLoad.map(async (referenceGroup) => {
      const res = await getProductReferenceGroupPrices(referenceGroup)
      return res
    })

    const results = await Promise.all(loadedPrices)
    productReferencesPrices.value = results.flat()
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

    try {
      const result = await axios.$get(
        `${config.PRODUCTS_API}/${productId}/${uid}/referenceGroups/${referenceGroup}/prices`
      )

      if (result.productPrices?.length) {
        return result.productPrices
      }

      return []
    } catch (error) {
      logger.error(`Error getting ${referenceGroup} prices`)
    }
  }

  return {
    price,
    productReferencesPrices,
    loadPrice,
    loadProductReferenceGroupsPrices,
    getProductReferenceGroupPrices,
  }
})
