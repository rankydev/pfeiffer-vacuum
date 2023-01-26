import { defineStore } from 'pinia'
import { ssrRef } from '@nuxtjs/composition-api'
import { useCartApi } from './partials/useCartApi'

export const useCartStore = defineStore('cartStore', () => {
  const cartApi = useCartApi()
  const { getOrCreateCart, mergeCarts } = cartApi

  // State
  const currentCart = ssrRef({})

  // Getters
  const currentCartGuid = computed(() => currentCart.value?.guid)

  const initialCartCheck = async () => {
    // ----- Hol dir cart cookie Kram ----- //
    /*
    const cartCookie = JSON.parse(cookieHelper.getCookie(ctx, 'cart', null));
    if (cartCookie) {
      commit('setCurrentCart', cartCookie);
    }
    */

    let tempCart = await getOrCreateCart(false)

    if (currentCartGuid.value !== tempCart?.guid) {
      const mergedCart = await mergeCarts(currentCartGuid.value, tempCart)
      if (mergedCart) tempCart = mergedCart
    }

    if (tempCart) currentCart.value = tempCart
  }

  return {
    // State
    currentCart,

    // Getters
    currentCartGuid,

    // Actions
    initialCartCheck,
  }
})
