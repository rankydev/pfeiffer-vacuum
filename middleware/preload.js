import getLoggerFor from '../utils/getLoggerFor'
import { useOldStore } from '~/stores/oldStore'

const logger = getLoggerFor('preload')

export default async function () {
  // TODO needs to be refactored when we split stores
  const store = useOldStore()

  // TODO rename this
  store.nuxtServerInit()

  /*
   *  Check the user token to logout user automatically when refresh token is expired. (PVAC-580)
   */
  // if (process.server) {
  //   logger.debug('Checking auth token.')
  //   await $authApi.getToken()
  // }

  // during SSR the first thing initialized is the store, reading the cookies for login and cart
  // then we need to distinguish between login process and normal refresh/reload
  if (store.isLoginProcess) {
    logger.debug('During login process')
    // during login process the anonymous cart and the user cart need to be merged.
    const anonymousCartGuid = store.currentCart?.guid
    logger.trace('Anonymous Cart ID: ', anonymousCartGuid)
    logger.trace('loadCurrentUser')
    await store.loadCurrentUser()
    logger.trace('mergeAndLoadCarts ID ', anonymousCartGuid)
    await store.mergeAndLoadCarts()
  } else {
    // otherwise, we just preload everything what is there
    logger.debug('Preloading user and cart.')
    await store.loadCurrentUser()

    // if there is no cart it should be created.
    // this happens, i.e. when a user is logged out and a new anonymous cart is needed
    await store.loadCurrentCart(true)
  }

  // TODO use other store
  const countries = store.countries
  if (!countries || countries.length === 0) {
    await store.loadCountries()
  }
}
