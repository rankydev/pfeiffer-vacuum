import { useOldStore } from '~/stores/oldStore'
import config from '../hybris.config'
const cookieHelper = require('../../../plugins/cookieHelper')

export function getCartApi(axiosInstance, ctx) {
  const logger = ctx.$getLoggerFor('cartApi')
  // TODO needs to be refactored when we split stores
  const store = useOldStore()

  function isValidCart(result) {
    return (
      result && typeof result === 'object' && !result.error && !result.errors
    )
  }

  return {
    /**
     * Gets a cart for anonymous user for the given guid (guest user id) of the cart.
     * @param anonymousCartGuid
     * @return {Promise<null|*>}
     */
    async getAnonymousCart(anonymousCartGuid) {
      logger.debug('Trying to get cart for anonymous. Guid:', anonymousCartGuid)
      if (anonymousCartGuid) {
        const existingCart = await axiosInstance.$get(
          `${config.CARTS_ANONYMOUS_API}/${anonymousCartGuid}`,
          { params: { fields: 'FULL' } }
        )
        if (isValidCart(existingCart)) {
          logger.debug(`Found anonymous cart with guid ${existingCart.guid}`)
          return existingCart
        }
      }
      return null
    },

    /**
     * Gets a cart for anonymous user for the given guid (guest user id) of the cart.
     * If no guid is given a new cart is created.
     *
     * @param createIfNotExist
     * @return {Promise<null|any>}
     */
    async getOrCreateAnonymousCart(createIfNotExist) {
      logger.debug('getOrCreateAnonymousCart')
      const anonymousCartGuid = this.getGuidForAnonymousCart()
      const existingCart = await this.getAnonymousCart(anonymousCartGuid)
      if (isValidCart(existingCart)) {
        this.updateCartCookie(existingCart)
        return existingCart
      }

      if (createIfNotExist) {
        logger.debug(
          `No existing cart found for guid ${anonymousCartGuid}. Trying to create a new cart.`
        )
        const newCart = await axiosInstance.$post(
          config.CARTS_ANONYMOUS_API,
          null,
          { params: { fields: 'FULL' } }
        )
        if (isValidCart(newCart)) {
          logger.debug(`Created new anonymous cart with guid ${newCart.guid}`)
          this.updateCartCookie(newCart)
          return newCart
        }

        logger.error('Unable to get or create anonymous cart. Returning null.')
      }

      return null
    },

    /**
     * Update the cookie for cart
     * @param cart
     */
    updateCartCookie(cart) {
      if (cart) {
        cookieHelper.setCookie(
          ctx,
          'cart',
          JSON.stringify({ code: cart.code, guid: cart.guid })
        )
      } else {
        cookieHelper.removeCookie(ctx, 'cart')
      }
    },

    /**
     * Gets or creates a cart for a logged in user. Returns the cart that was last modified.
     *
     * @return {Promise<null|any>}
     */
    async getOrCreateUserCart() {
      logger.debug('Trying to get or create cart for user.')

      let existingCart = null

      // check for oci user
      if (store.currentUser && store.currentUser.ociBuyer) {
        existingCart = await axiosInstance.$get(
          config.CARTS_CURRENT_USER_API + '/' + store.customerId,
          { params: { fields: 'FULL' } }
        )
      } else {
        existingCart = await axiosInstance.$get(
          config.CARTS_CURRENT_USER_API + '/current',
          { params: { fields: 'FULL' } }
        )
      }
      if (isValidCart(existingCart)) {
        logger.debug(`Found user cart with code ${existingCart.code}`)
        return existingCart
      }

      const newCart = await axiosInstance.$post(
        config.CARTS_CURRENT_USER_API,
        null,
        { params: { fields: 'FULL' } }
      )
      if (isValidCart(newCart)) {
        logger.debug(`Created new user cart with code ${newCart.code}`)
        return newCart
      }

      logger.error('Unable to get or create user cart. Returning null.')

      return null
    },

    /**
     * Get the guid for anonymous cart
     * @return {string|null}
     */
    getGuidForAnonymousCart() {
      logger.debug('getGuidForAnonymousCart')
      const currentCart = store.currentCart
      // from store
      if (currentCart && currentCart.guid) {
        logger.debug('cart ID from store')
        logger.trace('cart ID ', currentCart.guid)
        return currentCart.guid
      }

      // from cookie
      try {
        logger.debug('get cart from cookie')
        const cartCookie = JSON.parse(cookieHelper.getCookie(ctx, 'cart', null))
        if (cartCookie && cartCookie.guid) {
          return cartCookie.guid
        }
      } catch (e) {
        logger.warn('Unable to parse cart cookie.', e.message)
      }
      logger.debug('No cart ID')
      return null
    },

    /**
     * Gets or creates a cart
     *
     * @param createIfNotExist
     * @return {Promise<null|*>}
     */
    async getOrCreateCart(createIfNotExist) {
      logger.trace('GetOrCreateCart: If not exists: ', createIfNotExist)
      if (store.loggedIn) {
        return this.getOrCreateUserCart()
      } else {
        return this.getOrCreateAnonymousCart(createIfNotExist)
      }
    },

    /**
     * Performs cart merge of anonymous and user cart
     *
     * @param anonymousCartGuid guid of the anonymous cart to merge
     * @param userCart existing user cart to merge the anonymous into
     * @return {Promise<null|any>}
     */
    async mergeCarts(anonymousCartGuid, userCart) {
      logger.debug(
        `Trying to merge anonymous cart with guid ${anonymousCartGuid} and user cart with code ${userCart}`
      )
      const mergedCart = await axiosInstance.$post(
        config.CARTS_CURRENT_USER_API,
        null,
        {
          params: {
            fields: 'FULL',
            oldCartId: anonymousCartGuid,
            toMergeCartGuid: userCart.guid,
          },
        }
      )

      if (isValidCart(mergedCart)) {
        logger.debug(
          `Successfully merged carts with guid ${anonymousCartGuid} and user cart with code ${userCart}`
        )
        return mergedCart
      }

      logger.error(
        `Error when merging anonymous cart with guid ${anonymousCartGuid} and user cart with code ${userCart}`
      )
      return null
    },

    /**
     * Returns the cart api url dependent on the user login state
     *
     * @return {string|null}
     */
    getCartUrl() {
      if (store.loggedIn) {
        if (store.currentUser && store.currentUser.ociBuyer) {
          return config.CARTS_CURRENT_USER_API + '/' + store.customerId
        } else {
          return config.CARTS_CURRENT_USER_API + '/current'
        }
      } else if (store.currentCart) {
        return config.CARTS_ANONYMOUS_API + '/' + store.currentCart.guid
      } else {
        logger.error(
          'Error when loading cart url, anonymous cart not loaded yet.'
        )
        return null
      }
    },

    /**
     * Performs add to cart
     *
     * @param code
     * @param quantity
     * @return {Promise<boolean>}
     */
    async addToCart(code, quantity = 1) {
      await store.loadCurrentCart(true) // ensure cart exists
      const cartEntry = {
        quantity,
        product: {
          code,
        },
      }

      const result = await axiosInstance.$post(
        this.getCartUrl() + '/entries',
        cartEntry,
        {}
      )

      if (result && typeof result === 'object' && !result.error) {
        await store.loadCurrentCart(false) // refresh cart in store
        return true
      }

      logger.error(
        'Error when adding to cart. Returning false.',
        result.error ? result.error : ''
      )
      return false
    },

    /**
     * Updates the quantity of a cart entry
     *
     * @param entryNumber
     * @param quantity
     * @return {Promise<boolean>}
     */
    async updateQuantity(entryNumber, quantity) {
      const orderEntry = {
        quantity,
      }

      const result = await axiosInstance.$patch(
        this.getCartUrl() + '/entries/' + entryNumber,
        orderEntry,
        {}
      )

      if (result && typeof result === 'object' && !result.error) {
        await store.loadCurrentCart(false) // refresh cart in store
        return true
      }

      logger.error(
        'Error when updating quantity. Returning false.',
        result.error ? result.error : ''
      )
      return false
    },

    /**
     * Removes an entry from cart
     *
     * @param entryNumber
     * @return {Promise<boolean>}
     */
    async deleteEntry(entryNumber) {
      const result = await axiosInstance.delete(
        this.getCartUrl() + '/entries/' + entryNumber,
        {}
      )

      if (result && result.status === 200 && !result.error) {
        await store.loadCurrentCart(false) // refresh cart in store
        return true
      }

      logger.error(
        'Error when deleting entry. Returning false.',
        result.error ? result.error : ''
      )
      return false
    },

    /**
     * Set delivery address to cart
     *
     * @param address
     * @return {Promise<null|any>}
     */
    async setDeliveryAddress(address) {
      await store.loadCurrentCart(true) // ensure cart exists

      const result = await axiosInstance.$post(
        this.getCartUrl() + '/addresses/delivery',
        address
      )

      if (result && typeof result === 'object' && !result.error) {
        await store.loadCurrentCart(false) // refresh cart in store
        return result
      }

      logger.error(
        'Error when setting delivery addresses. Returning null.',
        result.error ? result.error : ''
      )
      return null
    },

    /**
     * Set reference customer reference number to cart
     *
     * @param reference
     * @return {Promise<boolean>}
     */
    async setReferenceNumber(reference) {
      await store.loadCurrentCart(true) // ensure cart exists

      // Because this endpoint needs a JSON String (and not a JSON String wrapped in an Object) we need to stringify the reference and set the appropriate header
      const result = await axiosInstance.post(
        this.getCartUrl() + '/customerreference',
        JSON.stringify(reference),
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (result && result.status === 200 && !result.error) {
        await store.loadCurrentCart(false) // refresh cart in store

        return true
      }

      logger.error(
        'Error when setting reference number. Returning false.',
        result.error ? result.error : ''
      )
      return false
    },

    async setRequestComment(comment) {
      await store.loadCurrentCart(true)
      const result = await axiosInstance.post(
        this.getCartUrl() + '/comment',
        JSON.stringify(comment),
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (result && result.status === 200 && !result.error) {
        await store.loadCurrentCart(false)
        return true
      }

      logger.error(
        'Error when setting request comment. Returning false.',
        result.error ? result.error : ''
      )
      return false
    },
  }
}
