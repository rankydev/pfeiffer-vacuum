import { defineStore, storeToRefs } from 'pinia'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { useCartStore } from '~/stores/cart'
import { useLogger } from '~/composables/useLogger'

export const useOrdersStore = defineStore('orders', () => {
  const { axios } = useAxiosForHybris()
  const cartStore = useCartStore()
  const { currentCart } = storeToRefs(cartStore)
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

  return {
    placeOrder,
  }
})
