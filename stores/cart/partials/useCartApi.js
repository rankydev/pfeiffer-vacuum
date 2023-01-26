import { storeToRefs } from 'pinia'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useCookieHelper } from '~/composables/useCookieHelper'
import { useUserStore } from '~/stores/user'
import { useCartStore } from '~/stores/cart'
import config from '~/config/hybris.config'

export const useCartApi = () => {
  const cookieHelper = useCookieHelper()
  const { axios } = useAxiosForHybris()

  const userStore = useUserStore()
  const { isLoggedIn } = storeToRefs(userStore)

  const cartStore = useCartStore()
  const { currentCartGuid } = storeToRefs(cartStore)

  /**
   * Cart helper functions
   */
  const isValidCart = (res) => {
    return res && typeof res === 'object' && !res.error && !res.errors
  }
  const updateCartCookie = (cart) => {
    if (cart) {
      cookieHelper.setCookie(
        'cart',
        JSON.stringify({ code: cart.code, guid: cart.guid })
      )
    } else {
      cookieHelper.removeCookie('cart')
    }
  }

  /**
   * Get cart information
   */
  // <--------- NOT CHECKED -----------> //
  const getCartUrl = () => {
    if (store.getters.loggedIn) {
      if (store.getters.currentUser && store.getters.currentUser.ociBuyer)
        return config.CARTS_CURRENT_USER_API + '/' + store.getters.customerId
      return config.CARTS_CURRENT_USER_API + '/current'
    } else if (store.state.currentCart) {
      return config.CARTS_ANONYMOUS_API + '/' + store.state.currentCart.guid
    } else {
      return null
    }
  }

  const getGuidForAnonymousCart = () => {
    // If current cart id is present return
    if (currentCartGuid.value) return currentCartGuid.value

    // Else get cart id from cookie
    try {
      const cartCookie = JSON.parse(cookieHelper.getCookie('cart', null))
      if (cartCookie?.guid) return cartCookie.guid
    } catch (e) {
      console.error('Unable to parse cart cookie', e)
    }
    return null
  }

  /**
   * Get, create or merge cart
   */
  const getAnonymousCart = async (anonymousCartGuid) => {
    if (anonymousCartGuid) {
      const existingCart = await axios.$get(
        `${config.CARTS_ANONYMOUS_API}/${anonymousCartGuid}`,
        { params: { fields: 'FULL' } }
      )
      return existingCart
    }
    return null
  }
  const getOrCreateAnonymousCart = async (createIfNotExist) => {
    const anonymousCartGuid = getGuidForAnonymousCart()
    const existingCart = await getAnonymousCart(anonymousCartGuid)
    if (isValidCart(existingCart)) {
      updateCartCookie(existingCart)
      return existingCart
    }

    if (createIfNotExist) {
      const newCart = await axios.$post(config.CARTS_ANONYMOUS_API, null, {
        params: { fields: 'FULL' },
      })
      if (isValidCart(newCart)) {
        updateCartCookie(newCart)
        return newCart
      }
    }
    return null
  }

  // <--------- NOT CHECKED -----------> //
  const getOrCreateUserCart = async () => {
    let existingCart = null

    // check for oci user
    if (store.getters.currentUser && store.getters.currentUser.ociBuyer) {
      existingCart = await axiosInstance.$get(
        config.CARTS_CURRENT_USER_API + '/' + store.getters.customerId,
        { params: { fields: 'FULL' } }
      )
    } else {
      existingCart = await axiosInstance.$get(
        config.CARTS_CURRENT_USER_API + '/current',
        { params: { fields: 'FULL' } }
      )
    }
    if (isValidCart(existingCart)) {
      return existingCart
    }

    const newCart = await axiosInstance.$post(
      config.CARTS_CURRENT_USER_API,
      null,
      { params: { fields: 'FULL' } }
    )
    if (isValidCart(newCart)) return newCart

    return null
  }

  const getOrCreateCart = (createIfNotExist) => {
    if (isLoggedIn.value) return getOrCreateUserCart()
    return getOrCreateAnonymousCart(createIfNotExist)
  }
  const mergeCarts = async (anonymousCartGuid, userCart) => {
    const mergedCart = await axios.$post(config.CARTS_CURRENT_USER_API, null, {
      params: {
        fields: 'FULL',
        oldCartId: anonymousCartGuid,
        toMergeCartGuid: userCart.guid,
      },
    })

    if (isValidCart(mergedCart)) return mergedCart

    return null
  }

  /**
   * Handle cart products
   */
  // <--------- NOT CHECKED -----------> //
  const addToCart = async (code, quantity = 1) => {
    await store.dispatch('loadCurrentCart', true) // ensure cart exists
    const cartEntry = {
      quantity,
      product: {
        code,
      },
    }

    const result = await axiosInstance.$post(
      getCartUrl() + '/entries',
      cartEntry,
      {}
    )

    if (result && typeof result === 'object' && !result.error) {
      await store.dispatch('loadCurrentCart', false) // refresh cart in store
      return true
    }

    return false
  }

  // <--------- NOT CHECKED -----------> //
  const deleteEntry = async (entryNumber) => {
    const result = await axiosInstance.delete(
      getCartUrl() + '/entries/' + entryNumber,
      {}
    )

    if (result && result.status === 200 && !result.error) {
      await store.dispatch('loadCurrentCart', false) // refresh cart in store
      return true
    }

    return false
  }

  // <--------- NOT CHECKED -----------> //
  const updateQuantity = async (entryNumber, quantity) => {
    const orderEntry = {
      quantity,
    }

    const result = await axiosInstance.$patch(
      getCartUrl() + '/entries/' + entryNumber,
      orderEntry,
      {}
    )

    if (result && typeof result === 'object' && !result.error) {
      await store.dispatch('loadCurrentCart', false) // refresh cart in store
      return true
    }

    return false
  }

  /**
   * Handle additional information
   */
  // <--------- NOT CHECKED -----------> //
  const setDeliveryAddress = async (address) => {
    await store.dispatch('loadCurrentCart', true) // ensure cart exists

    const result = await axiosInstance.$post(
      getCartUrl() + '/addresses/delivery',
      address
    )

    if (result && typeof result === 'object' && !result.error) {
      await store.dispatch('loadCurrentCart', false) // refresh cart in store
      return result
    }

    return null
  }

  // <--------- NOT CHECKED -----------> //
  const setReferenceNumber = async (reference) => {
    await store.dispatch('loadCurrentCart', true) // ensure cart exists

    // Because this endpoint needs a JSON String (and not a JSON String wrapped in an Object) we need to stringify the reference and set the appropriate header
    const result = await axiosInstance.post(
      getCartUrl() + '/customerreference',
      JSON.stringify(reference),
      { headers: { 'Content-Type': 'application/json' } }
    )

    if (result && result.status === 200 && !result.error) {
      await store.dispatch('loadCurrentCart', false) // refresh cart in store

      return true
    }

    return false
  }

  // <--------- NOT CHECKED -----------> //
  const setRequestComment = async (comment) => {
    await store.dispatch('loadCurrentCart', true)
    const result = await axiosInstance.post(
      getCartUrl() + '/comment',
      JSON.stringify(comment),
      { headers: { 'Content-Type': 'application/json' } }
    )

    if (result && result.status === 200 && !result.error) {
      await store.dispatch('loadCurrentCart', false)
      return true
    }

    return false
  }

  return {
    getOrCreateCart,
    mergeCarts,
  }
}
