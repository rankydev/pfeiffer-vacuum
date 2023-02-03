import { defineStore, storeToRefs } from 'pinia'
import {
  computed,
  onBeforeMount,
  onServerPrefetch,
  useContext,
  watch,
  ssrRef,
} from '@nuxtjs/composition-api'
import { useCartApi } from './partials/useCartApi'
import { useCookieHelper } from '~/composables/useCookieHelper'
import { useUserStore } from '~/stores/user'
import { useLogger } from '~/composables/useLogger'
import { useToast } from '~/composables/useToast'

export const useCartStore = defineStore('cart', () => {
  const { getCookie } = useCookieHelper()
  const { isLoggedIn } = storeToRefs(useUserStore())
  const { logger } = useLogger('cartApi')
  const toast = useToast()
  const { i18n } = useContext()

  // State
  const currentCart = ssrRef({})

  // Getters
  const currentCartGuid = computed(() => currentCart.value?.guid)

  const cartApi = useCartApi(currentCart, currentCartGuid)
  const { getOrCreateCart, mergeCarts, addToCart } = cartApi

  const initialCartLoad = async () => {
    const anonymousCartCookie = JSON.parse(getCookie('cart', null))
    if (anonymousCartCookie) currentCart.value = anonymousCartCookie

    let tempCart = await getOrCreateCart(!isLoggedIn.value)
    if (tempCart) currentCart.value = tempCart
  }

  const mergeCartsAfterLogin = async () => {
    const cartCookie = JSON.parse(getCookie('cart', null))

    if (currentCartGuid.value !== cartCookie?.guid) {
      currentCart.value = await mergeCarts(
        cartCookie.guid,
        currentCartGuid.value
      )
    }
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

  onBeforeMount(initialCartLoad)
  onServerPrefetch(initialCartLoad)

  watch(isLoggedIn, async (newVal) => {
    await initialCartLoad()
    if (newVal) {
      await mergeCartsAfterLogin()
    }
  })

  return {
    // State
    currentCart,

    // Getters
    currentCartGuid,

    // Actions
    addProductToCart,
  }
})
