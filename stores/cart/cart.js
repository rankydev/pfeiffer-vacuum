import { defineStore, storeToRefs } from 'pinia'
import {
  computed,
  onBeforeMount,
  onServerPrefetch,
  ssrRef,
  useContext,
  watch,
  ref,
  useRouter,
} from '@nuxtjs/composition-api'
import { useCartApi } from './partials/useCartApi'
import { useCookieHelper } from '~/composables/useCookieHelper'
import { useUserStore } from '~/stores/user'
import { useLogger } from '~/composables/useLogger'
import { useToast } from '~/composables/useToast'

export const useCartStore = defineStore('cart', () => {
  const { getCookie, removeCookie } = useCookieHelper()
  const userStore = useUserStore()
  const { isLoggedIn, isApprovedUser, userStatusTypeForInfoText } =
    storeToRefs(userStore)
  const { logger } = useLogger('cartStore')
  const toast = useToast()
  const { i18n, app } = useContext()
  const router = useRouter()

  // State
  const currentCart = ssrRef({})
  const loading = ref(false)

  // Getters
  const currentCartGuid = computed(() => currentCart.value?.guid)

  const cartApi = useCartApi(currentCart, currentCartGuid)
  const {
    getOrCreateCart,
    mergeCarts,
    addToCart,
    updateQuantity,
    deleteEntry,
    setDeliveryAddress,
    setReferenceNumber,
    setRequestComment,
    loadCart,
  } = cartApi

  const initialCartLoad = async () => {
    try {
      loading.value = true
      const anonymousCartCookie = JSON.parse(getCookie('cart', null))
      if (anonymousCartCookie) currentCart.value = anonymousCartCookie

      let tempCart = await getOrCreateCart(!isLoggedIn.value)
      if (tempCart) currentCart.value = tempCart
    } catch (error) {
      logger.error('initial cart load failed', error)
    } finally {
      loading.value = false
    }
  }

  const mergeCartsAfterLogin = async () => {
    const cartCookie = JSON.parse(getCookie('cart', null))

    if (currentCartGuid.value !== cartCookie?.guid) {
      currentCart.value = await mergeCarts(
        cartCookie?.guid,
        currentCartGuid.value
      )
    }
  }

  const addProductToCart = async (code, quantity) => {
    try {
      await addToCart(code, quantity)
    } catch (e) {
      logger.error('Could not add product to cart', e)
      toast.error(
        { description: i18n.t('cart.addToCartError') },
        { timeout: 3000 }
      )
    }
  }

  const deleteProductFromCart = async (entryNumber) => {
    try {
      await deleteEntry(entryNumber)
    } catch (e) {
      logger.error('Could not delete product from cart', e)
      toast.error(
        { description: i18n.t('cart.deleteFromCartError') },
        { timeout: 3000 }
      )
    }
  }

  const updateProductQuantityFromCart = async (entryNumber, quantity) => {
    try {
      if (quantity === 0) {
        await deleteEntry(entryNumber)
      } else {
        await updateQuantity(entryNumber, quantity)
      }
    } catch (e) {
      logger.error('Could not update product quantity', e)
      toast.error(
        { description: i18n.t('cart.updateCartError') },
        { timeout: 3000 }
      )
    }
  }

  const resetCurrentCart = async () => {
    currentCart.value = null
    removeCookie('cart')
    await loadCart()
  }

  const handleCheckoutClick = () => {
    if (!isLoggedIn.value) {
      return userStore.login()
    }
    if (isLoggedIn.value && isApprovedUser.value) {
      return router.push({ path: app.localePath('shop-checkout') })
    } else {
      toast.warning({
        description: i18n.t(
          `myaccount.userStatus.${userStatusTypeForInfoText.value}.requestInfo`
        ),
      })
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
    loading,

    // Getters
    currentCartGuid,

    // Actions
    addProductToCart,
    setDeliveryAddress,
    setReferenceNumber,
    setRequestComment,
    deleteProductFromCart,
    updateProductQuantityFromCart,
    handleCheckoutClick,
    resetCurrentCart,
  }
})
