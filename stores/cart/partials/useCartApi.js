import { storeToRefs } from 'pinia'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useCookieHelper } from '~/composables/useCookieHelper'
import { useUserStore } from '~/stores/user'
import { useLogger } from '~/composables/useLogger'
import config from '~/config/hybris.config'

export const useCartApi = (currentCart, currentCartGuid) => {
  const cookieHelper = useCookieHelper()
  const { axios } = useAxiosForHybris()

  const { logger } = useLogger('cartApi')

  const userStore = useUserStore()
  const { currentUser, customerId, isLoggedIn } = storeToRefs(userStore)

  /**
   * Cart helper functions
   */
  const loadCart = async (create) =>
    (currentCart.value = await getOrCreateCart(create))

  const validateCart = (res) => {
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

  const getGuidForAnonymousCart = () => {
    if (currentCartGuid.value) return currentCartGuid.value

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

    if (validateCart(existingCart)) {
      updateCartCookie(existingCart)
      return existingCart
    }

    if (createIfNotExist) {
      const newCart = await axios.$post(config.CARTS_ANONYMOUS_API, null, {
        params: { fields: 'FULL' },
      })
      if (validateCart(newCart)) {
        updateCartCookie(newCart)
        return newCart
      }
    }
    return null
  }

  const getOrCreateUserCart = async () => {
    let existingCart = null

    existingCart = await axios.$get(
      config.CARTS_CURRENT_USER_API +
        (currentUser.value?.ociBuyer ? customerId.value : '/current'),
      { params: { fields: 'FULL' } }
    )

    // Return when existing cart is valid
    if (validateCart(existingCart)) return existingCart

    const newCart = await axios.$post(config.CARTS_CURRENT_USER_API, null, {
      params: { fields: 'FULL' },
    })

    // Return when new cart is valid
    if (validateCart(newCart)) return newCart

    return null
  }
  const getOrCreateCart = (createIfNotExist) => {
    if (isLoggedIn.value) return getOrCreateUserCart()
    return getOrCreateAnonymousCart(createIfNotExist)
  }

  const mergeCarts = async (from, to) => {
    let mergedCart

    try {
      mergedCart = await axios.$post(config.CARTS_CURRENT_USER_API, null, {
        params: {
          fields: 'FULL',
          oldCartId: from,
          toMergeCartGuid: to,
        },
      })
      if (validateCart(mergedCart)) {
        updateCartCookie(null)
        return mergedCart
      }
    } catch (e) {
      logger.error('Could not merge carts', e)
    }

    return null
  }

  /**
   * Handle cart products
   */
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
      getCartUrl() + '/entries/' + Number(entryNumber),
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
    deleteEntry,
    updateQuantity,
  }
}
