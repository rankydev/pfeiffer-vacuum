import { defineStore } from 'pinia'
import {
  ref,
  computed,
  onBeforeMount,
  onServerPrefetch,
  useContext,
} from '@nuxtjs/composition-api'
import { useCartApi } from './partials/useCartApi'
import { useCookieHelper } from '~/composables/useCookieHelper'
import { useKeycloak } from '~/stores/user/partials/useKeycloak'
import { useLogger } from '~/composables/useLogger'
import { useToast } from '~/composables/useToast'

export const useCartStore = defineStore('cart', () => {
  const { getCookie } = useCookieHelper()
  const { isLoginProcess } = useKeycloak()
  const { logger } = useLogger('cartApi')
  const toast = useToast()
  const { i18n } = useContext()

  // State
  const currentCart = ref({})

  // Getters
  const currentCartGuid = computed(() => currentCart.value?.guid)

  const cartApi = useCartApi(currentCart, currentCartGuid)
  const { getOrCreateCart, mergeCarts, addToCart } = cartApi

  const initialCartCheck = async () => {
    const cartCookie = JSON.parse(getCookie('cart', null))
    if (cartCookie) currentCart.value = cartCookie

    let tempCart = await getOrCreateCart(false)

    if (isLoginProcess.value) {
      console.log('*** IS LOGIN PROCESS ***')
      if (currentCartGuid.value !== tempCart?.guid) {
        tempCart = await mergeCarts(currentCartGuid.value, tempCart)
      }
    } else {
      tempCart = await getOrCreateCart(true)
    }

    if (tempCart) currentCart.value = tempCart
  }

  const addProductToCart = async (code, quantity) => {
    try {
      await addToCart(code, quantity)
      toast.success(
        { description: i18n.t('cart.addToCartSuccess') },
        { timeout: 3000 }
      )
    } catch (e) {
      logger.error('Could not add product to cart', e)
      toast.error(
        { description: i18n.t('cart.addToCartError') },
        { timeout: 3000 }
      )
    }
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
    addProductToCart,
  }
})
