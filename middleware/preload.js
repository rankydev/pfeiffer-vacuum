import { useAuthStore } from '~/stores/auth'
import { getCookie } from '~/plugins/cookieHelper'

export default async function (ctx) {
  const logger = ctx.getLoggerFor('preload')
  const authStore = useAuthStore(ctx)

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
    logger.trace('loadCurrentUser')
    await authStore.loadCurrentUser(ctx)
  } else {
    // otherwise, we just preload everything what is there
    logger.debug('Preloading user and cart.')
    await authStore.loadCurrentUser(ctx)
  }
}
