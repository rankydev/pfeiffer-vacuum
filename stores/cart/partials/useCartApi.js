import { storeToRefs } from 'pinia'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useCookieHelper } from '~/composables/useCookieHelper'
import { useUserStore } from '~/stores/user'
import config from '~/config/hybris.config'

export const useCartApi = (currentCart, currentCartGuid) => {
  const cookieHelper = useCookieHelper()
  const { axios } = useAxiosForHybris()

  const userStore = useUserStore()
  const { currentUser, customerId, isLoggedIn } = storeToRefs(userStore)

  /**
   * Cart helper functions
   */
  // TODO: currently not used, activate when needed
  /*
  const loadCart = async (create) =>
    (currentCart.value = await getOrCreateCart(create))
  */
  const isValidCart = (res) => {
    console.log('----------> Is Cart Valid?')
    return res && typeof res === 'object' && !res.error && !res.errors
  }
  const updateCartCookie = (cart) => {
    console.log('----------> Update Cart Cookie')
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
  // TODO: currently not used, activate when needed
  /*
  const getCartUrl = () => {
    if (isLoggedIn.value) {
      if (currentUser.value?.ociBuyer)
        return config.CARTS_CURRENT_USER_API + '/' + customerId.value
      return config.CARTS_CURRENT_USER_API + '/current'
    } else if (currentCart.value) {
      return config.CARTS_ANONYMOUS_API + '/' + currentCartGuid.value
    } else {
      return null
    }
  }
   */
  const getGuidForAnonymousCart = () => {
    console.log(isLoggedIn, currentUser)
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
  const getOrCreateUserCart = async () => {
    let existingCart = null

    existingCart = await axios.$get(
      config.CARTS_CURRENT_USER_API + currentUser.value?.ociBuyer
        ? customerId.value
        : '/current',
      { params: { fields: 'FULL' } }
    )

    // Return when existing cart is valid
    if (isValidCart(existingCart)) return existingCart

    const newCart = await axios.$post(config.CARTS_CURRENT_USER_API, null, {
      params: { fields: 'FULL' },
    })

    // Return when new cart is valid
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
  // TODO: currently not used, activate when needed
  /*
  const addToCart = async (code, quantity = 1) => {
    await loadCart(true)
    const cartEntry = {
      quantity,
      product: {
        code,
      },
    }

    const result = await axios.$post(getCartUrl() + '/entries', cartEntry, {})

    if (result && typeof result === 'object' && !result.error) {
      await loadCart(false)
      return true
    }

    return false
  }
  const deleteEntry = async (entryNumber) => {
    const result = await axios.delete(
      getCartUrl() + '/entries/' + entryNumber,
      {}
    )

    if (result?.status === 200 && !result.error) {
      await loadCart(false)
      return true
    }

    return false
  }
  const updateQuantity = async (entryNumber, quantity) => {
    const orderEntry = {
      quantity,
    }

    const result = await axios.$patch(
      getCartUrl() + '/entries/' + entryNumber,
      orderEntry,
      {}
    )

    if (result && typeof result === 'object' && !result.error) {
      await loadCart(false)
      return true
    }

    return false
  }
   */

  /**
   * Handle additional information
   */
  // TODO: currently not used, activate when needed
  /*
  const setDeliveryAddress = async (address) => {
    await loadCart(true)

    const result = await axios.$post(
      getCartUrl() + '/addresses/delivery',
      address
    )

    if (result && typeof result === 'object' && !result.error) {
      await store.dispatch('loadCurrentCart', false) // refresh cart in store
      return result
    }

    return null
  }
  const setReferenceNumber = async (reference) => {
    await loadCart(true)

    // Because this endpoint needs a JSON String (and not a JSON String wrapped in an Object) we need to stringify the reference and set the appropriate header
    const result = await axios.post(
      getCartUrl() + '/customerreference',
      JSON.stringify(reference),
      { headers: { 'Content-Type': 'application/json' } }
    )

    if (result && result.status === 200 && !result.error) {
      await loadCart(false)

      return true
    }

    return false
  }
  const setRequestComment = async (comment) => {
    await loadCart(true)
    const result = await axios.post(
      getCartUrl() + '/comment',
      JSON.stringify(comment),
      { headers: { 'Content-Type': 'application/json' } }
    )

    if (result && result.status === 200 && !result.error) {
      await loadCart(false)
      return true
    }

    return false
  }
   */

  return {
    getOrCreateCart,
    mergeCarts,
    addToCart,
  }
}
