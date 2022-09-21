import { ref, computed, useContext } from '@nuxtjs/composition-api'
import { setCookie, removeCookie, getCookie } from '~/plugins/cookieHelper'
import { useOciStore } from '~/stores/oci'
import getLoggerFor from '~/utils/getLoggerFor'

const keycloakJS = typeof window !== 'undefined' ? require('keycloak-js') : null

export const useKeycloak = () => {
  const ctx = useContext()
  const logger = getLoggerFor('useKeycloak')
  const auth = ref(null)
  const keycloakInstance = ref(null)
  const isLoginProcess = ref(false)

  const isOciUser = computed(() => {
    return auth.value?.type === 'oci'
  })

  const loggedIn = computed(() => {
    return !!auth.value?.access_token
  })

  const setAuth = (newAuth) => {
    console.log('### setAuth')
    auth.value = newAuth
  }

  const removeCookiesAndDeleteAuthData = () => {
    logger.debug('removeCookiesAndDeleteAuthData')
    removeCookie(ctx, 'auth.accessToken')
    removeCookie(ctx, 'auth.refreshToken')
    removeCookie(ctx, 'auth.idToken')
    removeCookie(ctx, 'auth.validUntil')
    removeCookie(ctx, 'auth.tokenType')

    setAuth(null)
  }

  /** Keycloak instance is only created, when we are not logging in via OCI **/
  /** all functions only used with keycloakInstance.value have a prefix 'kc' */
  const createKeycloakInstance = () => {
    logger.debug('createKeycloakInstance')
    const ociStore = useOciStore()
    if (ociStore.isOciPage || isOciUser.value) {
      return
    }

    const { app, $contextUtil, $keycloakInstance } = ctx
    if (!keycloakJS || keycloakInstance.value) {
      logger.debug('No keycloakJS or existing keycloakInstance')
      return
    }

    if ($keycloakInstance) {
      logger.debug('keycloakInstance from context')
      keycloakInstance.value = $keycloakInstance
      return
    }

    if (app.$keycloakInstance) {
      logger.debug('keycloakInstance from app')
      keycloakInstance.value = app.$keycloakInstance
      return
    }

    logger.debug('creating new keycloakInstance')

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
    if (loggedIn.value) {
      keycloakInitOptions = {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${$contextUtil.getCurrentHostUrl()}/silentSsoCheck.html`,
        pkceMethod: 'S256',
        enableLogging: true,
        checkLoginIframe: true,
        checkLoginIframeInterval: 5,
        responseMode: 'query',
        idToken: auth.value.id_token,
        refreshToken: auth.value.refresh_token,
        token: auth.value.access_token,
      }
      logger.trace('keycloakInitOptions with userdata', keycloakInitOptions)
    }

    keycloakInstance.value = keycloakJS(keycloakConfig)

    //event listener for successful Keycloak authentication, start rest of login process
    keycloakInstance.value.onAuthSuccess = kcOnAuthSuccess
    keycloakInstance.value.onAuthError = removeCookiesAndDeleteAuthData
    //event listener for auto refresh Keycloak authentication, start rest of login without reloading user.
    keycloakInstance.value.onAuthRefreshSuccess = kcOnAuthSuccess
    keycloakInstance.value.onAuthRefreshError = removeCookiesAndDeleteAuthData
    keycloakInstance.value.onAuthLogout = kcOnAuthLogout

    // only debug output
    keycloakInstance.value.onReady = (authenticated) =>
      logger.debug(
        `kcOnReady::authenticated ${authenticated} and keycloakInstance.value.authenticated=${keycloakInstance.value.authenticated}`
      )

    const MIN_TOKEN_VALIDITY_IN_SECONDS = 30

    // if within access-token-lifespan no reload happens, this is needed.
    keycloakInstance.value.onTokenExpired = async () => {
      logger.debug('kcOnTokenExpired')
      keycloakInstance.value
        .updateToken(MIN_TOKEN_VALIDITY_IN_SECONDS)
        .then((refreshed) =>
          logger.debug('token refresh happen. Token was refreshed:', refreshed)
        )
        .catch((reason) =>
          logger.info('token refresh failed due to session timeout or ', reason)
        )
    }

    keycloakInstance.value
      .init(keycloakInitOptions)
      .catch((reason) => logger.warn('init failed. reason: ', reason))
    logger.debug('Keycloak initialized')

    app.$keycloakInstance = keycloakInstance.value
  }

  const kcRedirect = (query) => {
    logger.debug('kcRedirect')
    logger.trace(
      'kcRedirect:: authenticated, ',
      keycloakInstance.value.authenticated
    )
    const { app } = ctx
    const { localePath, router } = app
    const path = router.currentRoute?.query?.redirectTo

    if (path) {
      logger.trace('kcRedirect::path: ', path)
      return router.push({ path, query })
    }

    logger.trace('kcRedirect::shop: ', query)
    return router.push(localePath({ name: 'shop', query }))
  }

  const kcOnAuthSuccess = async () => {
    logger.debug('kcOnAuthSuccess')
    isLoginProcess.value = true
    const canAccessApprovedCustomerFunctionality =
      keycloakInstance.value.hasRealmRole('customer_ecommerce')

    if (!canAccessApprovedCustomerFunctionality) {
      const unverified = keycloakInstance.value.tokenParsed?.email
      removeCookiesAndDeleteAuthData()
      return kcRedirect(unverified && { unverified })
    }

    const token = reconstructToken()
    await setCookiesAndSaveAuthData(token)

    isLoginProcess.value = false
  }

  const kcOnAuthLogout = async () => {
    logger.debug('kcOnAuthLogout')
    removeCookiesAndDeleteAuthData()
    const { app } = ctx
    const { localePath, router } = app
    return router.push(localePath({ name: 'shop' }))
  }

  const setCookiesAndSaveAuthData = (token) => {
    logger.debug('setCookiesAndSaveAuthData')
    logger.trace('setCookiesAndSaveAuthData::TOKEN ', token)
    setCookie(
      ctx,
      'auth.accessToken',
      token.access_token,
      new Date(token.validUntil)
    )
    setCookie(
      ctx,
      'auth.refreshToken',
      token.refresh_token,
      new Date(token.refresh_expires_in)
    )
    setCookie(
      ctx,
      'auth.idToken',
      token.id_token,
      new Date(token.refresh_expires_in)
    )
    setCookie(
      ctx,
      'auth.validUntil',
      token.validUntil,
      new Date(token.validUntil)
    )
    setCookie(
      ctx,
      'auth.tokenType',
      token.token_type,
      new Date(token.validUntil)
    )

    setAuth(token)
  }

  const reconstructToken = () => {
    logger.debug('reconstructToken')
    if (!keycloakInstance.value) {
      return {}
    }

    const expTimestampAccessToken =
      keycloakInstance.value.tokenParsed.exp * 1000
    const expTimestampRefreshToken =
      keycloakInstance.value.refreshTokenParsed.exp * 1000
    return {
      access_token: keycloakInstance.value.token,
      refresh_token: keycloakInstance.value.refreshToken,
      id_token: keycloakInstance.value.idToken,
      token_type: 'Bearer',
      session_state: keycloakInstance.value.tokenParsed.session_state,
      validUntil: expTimestampAccessToken,
      refresh_expires_in: expTimestampRefreshToken,
      scope: 'openid profile email',
    }
  }

  const authFromCookie = {
    access_token: getCookie(ctx, 'auth.accessToken'),
    refresh_token: getCookie(ctx, 'auth.refreshToken'),
    id_token: getCookie(ctx, 'auth.idToken'),
    validUntil: getCookie(ctx, 'auth.validUntil'),
    token_type: getCookie(ctx, 'auth.tokenType'),
  }

  if (authFromCookie.access_token && authFromCookie.access_token !== 'null') {
    logger.debug('Token from cookie')
    logger.trace(authFromCookie)
    setAuth(authFromCookie)
  } else {
    logger.debug('Error when loading cookies', authFromCookie)
    setAuth(null)
  }

  return {
    keycloakInstance,
    auth,
    createKeycloakInstance,
    removeCookiesAndDeleteAuthData,
    loggedIn,
    isLoginProcess,
  }
}
