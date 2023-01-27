import { defineStore } from 'pinia'
import {
  ssrRef,
  computed,
  onBeforeMount,
  onServerPrefetch,
} from '@nuxtjs/composition-api'
import { useCartApi } from './partials/useCartApi'
import { useCookieHelper } from '~/composables/useCookieHelper'
import { useKeycloak } from '~/stores/user/partials/useKeycloak'

export const useCartStore = defineStore('cart', () => {
  const { getCookie } = useCookieHelper()
  const { isLoginProcess } = useKeycloak()

  // State
  const currentCart = ssrRef({})

  // Getters
  const currentCartGuid = computed(() => {
    return 'currentCart.value?.guid'
  })

  const cartApi = useCartApi(currentCart, currentCartGuid)
  const { getOrCreateCart, mergeCarts } = cartApi

  const initialCartCheck = async () => {
    console.log('// ----- Start Initial Cart Check ----- //')
    const cartCookie = JSON.parse(getCookie('cart', null))
    if (cartCookie) currentCart.value = cartCookie

    let tempCart = await getOrCreateCart(false)

    if (isLoginProcess.value) {
      if (currentCartGuid.value !== tempCart?.guid) {
        tempCart = await mergeCarts(currentCartGuid.value, tempCart)
      }
    } else {
      tempCart = await getOrCreateCart(true)
    }

    if (tempCart) currentCart.value = tempCart
    console.log('// ----- End Initial Cart Check ----- //')
  }

  onBeforeMount(initialCartCheck)
  onServerPrefetch(initialCartCheck)

  return {
    // State
    currentCart,

    // Getters
    currentCartGuid,

    // Actions
    initialCartCheck,
  }
})
