import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'
import { getCookie } from '~/plugins/cookieHelper'

export default async function (ctx) {
  const logger = ctx.getLoggerFor('preload')
  const authStore = useAuthStore()
  const cartStore = useCartStore()

  const cartCookie = JSON.parse(getCookie(ctx, 'cart', null))
  if (cartCookie) {
    cartStore.currentCart = cartCookie
  }

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
