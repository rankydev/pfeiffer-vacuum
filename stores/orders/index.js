import config from '~/config/hybris.config'
import { defineStore, storeToRefs } from 'pinia'
import { useOciStore } from '~/stores/oci'
import { useCartStore } from '~/stores/cart'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useLogger } from '~/composables/useLogger'

export const useOrdersStore = defineStore('orders', () => {
  const { axios } = useAxiosForHybris()
  const cartStore = useCartStore()
  const { currentCart } = storeToRefs(cartStore)
  const ociStore = useOciStore()
  const { customerId } = storeToRefs(ociStore)
  const { logger } = useLogger('ordersStore')

  const placeOrder = async () => {
    try {
      const result = await axios.$post(
        config.ORDER_API,
        {},
        {
          params: {
            cartId: currentCart.value.code,
          },
        }
      )

      if (typeof result === 'object' && !result.error) {
        cartStore.resetCurrentCart()
        return result
      } else {
        throw 'unexpected error'
      }
    } catch (error) {
      logger.error('Error placing order', error)
      throw error
    }
  }

  const placeOciOrder = async () => {
    try {
      const result = await axios.$post(
        `${config.OCI_ORDER_API}/${customerId.value}/oci-punchout`
      )

      if (!result.error) {
        cartStore.resetCurrentCart()
        return result.formParams
      }

      throw result.error
    } catch (error) {
      logger.error('Error when creating oci order.', error)
      throw error
    }
  }

  return {
    placeOrder,
    placeOciOrder,
  }
})
