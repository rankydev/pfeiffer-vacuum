import { defineStore, storeToRefs } from 'pinia'
import { ref, useRoute } from '@nuxtjs/composition-api'
import { useLogger } from '~/composables/useLogger'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { joinURL } from 'ufo'
import { useUserStore } from '~/stores/user'
import { REFERENCE_GROUPS_LIST } from './config'

export const usePricesStore = defineStore('prices', () => {
  const route = useRoute()
  const { logger } = useLogger('productStore')
  const { axios } = useAxiosForHybris()

  const price = ref(null)
  const productReferencesPrices = ref([])

  const userStore = useUserStore()
  const { isApprovedUser, currentUser, isLoggedIn } = storeToRefs(userStore)

  const loadPrice = async (productId, uid) => {
    const url = joinURL(config.PRODUCTS_API, productId, uid, 'price')
    const result = await axios.$get(url, {
      params: { fields: 'FULL' },
    })

    price.value = result
  }

  const loadProductReferenceGroupsPrices = async (productId, uid) => {
    productReferencesPrices.value = []

    const loadedPrices = REFERENCE_GROUPS_LIST.map(async (referenceGroup) => {
      const res = await getProductReferenceGroupPrices(
        productId,
        uid,
        referenceGroup
      )
      return res
    })

    const results = await Promise.all(loadedPrices)
    productReferencesPrices.value = results.flat()
  }

  const getProductReferenceGroupPrices = async (
    productId,
    uid,
    referenceGroup
  ) => {
    if (!REFERENCE_GROUPS_LIST.includes(referenceGroup)) {
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

  const loadAllPrices = async () => {
    const productId = route.value.params.product || ''
    if (!productId) {
      throw new Error('No valid id given in route object.')
    }

    if (!isLoggedIn.value) return

    if (!isApprovedUser.value) {
      logger.error('User is not approved yet. Prices can not be loaded')
      return
    }

    const { uid } = currentUser.value
    if (!uid) {
      logger.error('No customer id given.')
      return
    }

    await Promise.all([
      loadPrice(productId, uid),
      loadProductReferenceGroupsPrices(productId, uid),
    ])
  }

  return {
    price,
    productReferencesPrices,
    loadAllPrices,
  }
})
