import getLoggerFor from '../utils/getLoggerFor'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import { getCookie, removeCookie } from '~/plugins/cookieHelper'

const logger = getLoggerFor('preload')

export default async function (ctx) {
  // TODO needs to be refactored when we split stores
  const authStore = useAuthStore()
  const cartStore = useCartStore()

  // TODO huh?
  // await this.dispatch('breadcrumbs/init')

  const cartCookie = JSON.parse(getCookie(ctx, 'cart', null))
  if (cartCookie) {
    cartStore.currentCart = cartCookie
  }

  removeCookie(ctx, 'auth')

  const authFromCookie = {
    access_token: getCookie(ctx, 'auth.accessToken'),
    refresh_token: getCookie(ctx, 'auth.refreshToken'),
    id_token: getCookie(ctx, 'auth.idToken'),
    validUntil: getCookie(ctx, 'auth.validUntil'),
    token_type: getCookie(ctx, 'auth.tokenType'),
  }

  if (authFromCookie.access_token) {
    logger.debug('Token from cookie')
    logger.trace(authFromCookie)
    authStore.setAuth(authFromCookie)
  } else {
    logger.debug('Error when loading cookies', authFromCookie)
    authStore.setAuth(null)
  }

  /*
   *  Check the user token to logout user automatically when refresh token is expired. (PVAC-580)
   */
  // if (process.server) {
  //   logger.debug('Checking auth token.')
  //   await $authApi.getToken()
  // }

  // during SSR the first thing initialized is the store, reading the cookies for login and cart
  // then we need to distinguish between login process and normal refresh/reload
  if (authStore.isLoginProcess) {
    logger.debug('During login process')
    // during login process the anonymous cart and the user cart need to be merged.
    const anonymousCartGuid = cartStore.currentCart?.guid
    logger.trace('Anonymous Cart ID: ', anonymousCartGuid)
    logger.trace('loadCurrentUser')
    await authStore.loadCurrentUser()
    logger.trace('mergeAndLoadCarts ID ', anonymousCartGuid)
    await cartStore.mergeAndLoadCarts(anonymousCartGuid)
  } else {
    // otherwise, we just preload everything what is there
    logger.debug('Preloading user and cart.')
    await authStore.loadCurrentUser()

    // if there is no cart it should be created.
    // this happens, i.e. when a user is logged out and a new anonymous cart is needed
    await cartStore.loadCurrentCart(true)
  }
}
