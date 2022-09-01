import Vue from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useOciStore } from '~/stores/oci'

const keycloakJS = typeof window !== 'undefined' ? require('keycloak-js') : null
const cookieHelper = require('../plugins/cookieHelper')

const MIN_TOKEN_VALIDITY_IN_SECONDS = 30

export function getAuthApi(ctx) {
  const logger = ctx.getLoggerFor('authApi')
  logger.debug('getAuthApi')
  logger.trace(`getAuthApi ${process.client ? 'Client' : 'Server'}`)

  const authStore = useAuthStore()
  const ociStore = useOciStore()
  let keycloakInstance = null

  if (!ociStore.isOciPage && !authStore.isOciUser) {
    createKeycloakInstance()
  }

  /**
   *   keycloak library takes the token apart and sets it on its parameters, the later parts of the login process use the entire token though
   *   this reconstructs the token, alternatively, the rest of the login process could be looked at and adapted to use the keycloak parameters,
   *   especially "setAuth" which sets state.auth is important
   */
  function reconstructToken() {
    logger.debug('reconstructToken')
    if (!keycloakInstance) {
      return {}
    }

    const expTimestampAccessToken = keycloakInstance.tokenParsed.exp * 1000
    const expTimestampRefreshToken =
      keycloakInstance.refreshTokenParsed.exp * 1000
    return {
      access_token: keycloakInstance.token,
      refresh_token: keycloakInstance.refreshToken,
      id_token: keycloakInstance.idToken,
      token_type: 'Bearer',
      session_state: keycloakInstance.tokenParsed.session_state,
      validUntil: expTimestampAccessToken,
      refresh_expires_in: expTimestampRefreshToken,
      scope: 'openid profile email',
    }
  }

  /** Keycloak instance is only created, when we are not logging in via OCI **/
  /** all functions only used with keycloak have a prefix 'kc' */
  function createKeycloakInstance() {
    logger.debug('createKeycloakInstance')
    const { app, $contextUtil } = ctx
    if (!keycloakJS || keycloakInstance) {
      logger.debug('No keycloakJS or existing keycloakInstance')
      return
    }

    if (ctx.$keycloakInstance) {
      logger.debug('keycloakInstance from context')
      keycloakInstance = ctx.$keycloakInstance
      return
    }

    if (app.$keycloakInstance) {
      logger.debug('keycloakInstance from app')
      keycloakInstance = app.$keycloakInstance
      return
    }

    logger.debug('creating new keycloakInstance')

    const kcRedirect = (query) => {
      logger.debug('kcRedirect')
      logger.trace(
        'kcRedirect:: authenticated, ',
        keycloakInstance.authenticated
      )
      const { localePath, router } = app
      const path = router.currentRoute?.query?.redirectTo

      if (path) {
        logger.trace('kcRedirect::path: ', path)
        return router.push({ path, query })
      }

      logger.trace('kcRedirect::shop: ', query)
      return router.push(localePath({ name: 'shop', query }))
    }

    const kcOnAuthSuccess = async function () {
      logger.debug('kcOnAuthSuccess')
      authStore.isLoginProcess = true
      const canAccessApprovedCustomerFunctionality =
        keycloakInstance.hasRealmRole('customer_ecommerce')

      if (!canAccessApprovedCustomerFunctionality) {
        const unverified = keycloakInstance.tokenParsed?.email
        removeCookiesAndDeleteAuthData()
        return kcRedirect(unverified && { unverified })
      }

      const token = reconstructToken()
      await setCookiesAndSaveAuthData(token)

      // TODO we need the proxy for this to work
      logger.trace('get VSM token')
      await ctx.$vsmApi.getVsmToken(false)
      authStore.isLoginProcess = false
    }

    const kcOnAuthLogout = async function () {
      logger.debug('kcOnAuthLogout')
      removeCookiesAndDeleteAuthData()
      const { localePath, router } = app
      return router.push(localePath({ name: 'shop' }))
    }

    const keyCloakBase = process.env.KEYCLOAK_BASE_URL
    const keyCloakRealm = process.env.KEYCLOAK_REALM_NAME
    const keyCloakClientId = process.env.KEYCLOAK_CLIENT_ID

    //keycloakConfig, set the URL, realm, client
    const keycloakConfig = {
      url: keyCloakBase,
      realm: keyCloakRealm,
      clientId: keyCloakClientId,
    }
    let keycloakInitOptions = {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${$contextUtil.getCurrentHostUrl()}/silentSsoCheck.html`,
      pkceMethod: 'S256',
      enableLogging: true,
      checkLoginIframe: true,
      checkLoginIframeInterval: 5,
      responseMode: 'query',
    }
    //keycloakInitOptions, how to check the SSO and security method for PKCE
    if (authStore.loggedIn) {
      logger.trace('keycloakInitOptions with userdata')
      keycloakInitOptions = {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${$contextUtil.getCurrentHostUrl()}/silentSsoCheck.html`,
        pkceMethod: 'S256',
        enableLogging: true,
        checkLoginIframe: true,
        checkLoginIframeInterval: 5,
        responseMode: 'query',
        idToken: authStore.auth.id_token,
        refreshToken: authStore.auth.refresh_token,
        token: authStore.auth.access_token,
      }
    }

    keycloakInstance = keycloakJS(keycloakConfig)
    keycloakInstance
      .init(keycloakInitOptions)
      .catch((reason) => logger.warn('init failed. reason: ', reason))
    logger.debug('Keycloak initialized')
    //event listener for successful Keycloak authentication, start rest of login process
    keycloakInstance.onAuthSuccess = kcOnAuthSuccess
    keycloakInstance.onAuthError = removeCookiesAndDeleteAuthData
    //event listener for auto refresh Keycloak authentication, start rest of login without reloading user.
    keycloakInstance.onAuthRefreshSuccess = kcOnAuthSuccess
    keycloakInstance.onAuthRefreshError = removeCookiesAndDeleteAuthData
    keycloakInstance.onAuthLogout = kcOnAuthLogout
    // only debug output
    if (process.env.CONSOLA_LEVEL >= 4) {
      keycloakInstance.onReady = (authenticated) =>
        logger.debug(
          `kcOnReady::authenticated ${authenticated} and keycloak.authenticated=${keycloakInstance.authenticated}`
        )
    }

    // if within access-token-lifespan no reload happens, this is needed.
    keycloakInstance.onTokenExpired = async () =>
      keycloakInstance
        .updateToken(MIN_TOKEN_VALIDITY_IN_SECONDS)
        .then((refreshed) =>
          logger.debug('token refresh happen. Token was refreshed:', refreshed)
        )
        .catch((reason) =>
          logger.info('token refresh failed due to session timeout or ', reason)
        )

    ctx.$keycloakInstance = keycloakInstance
    app.$keycloakInstance = keycloakInstance
  }

  /*
   ********** LOGIN **********
   */
  const login = async function login() {
    logger.debug('login')
    const url = window.location.href
    console.log('### redirect', url)
    // TODO do we need the locale?
    const options = { locale: 'store.currentLanguage', redirectUri: url }
    await keycloakInstance.login(options)
  }

  const setCookiesAndSaveAuthData = function (token) {
    logger.debug('setCookiesAndSaveAuthData')
    logger.trace('setCookiesAndSaveAuthData::TOKEN ', token)
    cookieHelper.setCookie(
      ctx,
      'auth.accessToken',
      token.access_token,
      new Date(token.validUntil)
    )
    cookieHelper.setCookie(
      ctx,
      'auth.refreshToken',
      token.refresh_token,
      new Date(token.refresh_expires_in)
    )
    cookieHelper.setCookie(
      ctx,
      'auth.idToken',
      token.id_token,
      new Date(token.refresh_expires_in)
    )
    cookieHelper.setCookie(
      ctx,
      'auth.validUntil',
      token.validUntil,
      new Date(token.validUntil)
    )
    cookieHelper.setCookie(
      ctx,
      'auth.tokenType',
      token.token_type,
      new Date(token.validUntil)
    )

    authStore.setAuth(token)
  }

  /*
   ********** LOGOUT **********
   */

  const logout = async function () {
    logger.debug('logout')

    // remove internal data
    removeCookiesAndDeleteAuthData()

    if (keycloakInstance) {
      // no redirect needed here, since onAuthLogout from keycloak takes care of this.
      await keycloakInstance.logout()
    } else {
      // redirect here, if no keycloak instance is available.
      const { app } = ctx
      const { localePath, router } = app
      return router.push(localePath({ name: 'shop' }))
    }
  }

  const removeCookiesAndDeleteAuthData = function () {
    logger.debug('removeCookiesAndDeleteAuthData')
    cookieHelper.removeCookie(ctx, 'auth.accessToken')
    cookieHelper.removeCookie(ctx, 'auth.refreshToken')
    cookieHelper.removeCookie(ctx, 'auth.idToken')
    cookieHelper.removeCookie(ctx, 'auth.validUntil')
    cookieHelper.removeCookie(ctx, 'auth.tokenType')

    authStore.setAuth(null)
  }

  const addHoursToCurrentDate = (hours) => {
    return new Date().setHours(new Date().getHours() + hours)
  }

  const createBasicAuthToken = (username, password) => {
    const token = Buffer.from(`${username}:${password}`).toString('base64')
    return {
      access_token: token,
      token_type: 'Basic',
      validUntil: addHoursToCurrentDate(24),
      type: 'oci',
    }
  }

  const loginWithBasicAuth = (username, password) => {
    logger.debug('loginWithBasicAuth')
    const token = createBasicAuthToken(username, password)
    setCookiesAndSaveAuthData(token)
  }

  return {
    login,
    logout,
    loginWithBasicAuth,
  }
}

export default (ctx) => {
  const { app } = ctx
  const authApi = getAuthApi(ctx)

  // Inject Auth API into the Vue instance to use it client side
  Vue.prototype.$authApi = authApi

  app.$authApi = authApi
  ctx.$authApi = authApi
}
