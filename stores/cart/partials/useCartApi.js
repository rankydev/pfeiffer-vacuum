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

  const createUserCart = async () => {
    return await axios.$post(config.CARTS_CURRENT_USER_API, null, {
      params: { fields: 'FULL' },
    })
  }

  const getOrCreateUserCart = async () => {
    let existingCart = null

    try {
      existingCart = await axios.$get(
        config.CARTS_CURRENT_USER_API +
          (currentUser.value?.ociBuyer ? customerId.value : '/current'),
        { params: { fields: 'FULL' } }
      )

      // Return when existing cart is valid
      if (validateCart(existingCart)) return existingCart
    } catch (error) {
      if (error?.status === 400 || error?.status === 404) {
        // in this case there is probably an old cart (cart after placeOrder f.e.) which is no longer valid or does not exist
        // do not exit the function but create a fresh cart below which will replace the invalid current one
        logger.warn(
          'current cart could not be loaded. A new cart will be created now.',
          error
        )
      } else {
        // in this case something unexpected happened.
        // we should not create a new cart since the old one may be still valid and something else went wrong
        throw error
      }
    }

    const newCart = await createUserCart()

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
  const setDeliveryAddress = async (address) => {
    await loadCart(true)

    const result = await axios.$post(
      getCartUrl() + '/addresses/delivery',
      address
    )

    if (result && typeof result === 'object' && !result.error) {
      await loadCart(false)
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
    }
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
    }
  }

  return {
    getOrCreateCart,
    mergeCarts,
    loadCart,
    addToCart,
    deleteEntry,
    setDeliveryAddress,
    setReferenceNumber,
    setRequestComment,
    updateQuantity,
  }
}
