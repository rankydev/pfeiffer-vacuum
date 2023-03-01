import { defineStore, storeToRefs } from 'pinia'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { useCartStore } from '~/stores/cart'

export const useOrdersStore = defineStore('orders', () => {
  const { axios } = useAxiosForHybris()
  const cartStore = useCartStore()
  const { currentCart } = storeToRefs(cartStore)

  const placeOrder = async () => {
    return axios.$post(
      config.ORDER_API,
      {},
      {
        params: {
          cartId: currentCart.value.code,
        },
      }
    )
  }

  return {
    placeOrder,
  }
})
