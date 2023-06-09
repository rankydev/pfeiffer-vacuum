import {
  ref,
  ssrRef,
  computed,
  useContext,
  useRoute,
  useRouter,
  onBeforeMount,
  onServerPrefetch,
} from '@nuxtjs/composition-api'
import { useCookieHelper } from '~/composables/useCookieHelper'
import { useContextUtil } from '~/composables/useContextUtil'
import { useLogger } from '~/composables/useLogger'

const keycloakJS =
  typeof window !== 'undefined' && !process.env.STORYBOOK
    ? require('keycloak-js')
    : null

export const useKeycloak = () => {
  const ctx = useContext()
  const { logger } = useLogger('useKeycloak')
  const { getCurrentHostUrl } = useContextUtil()
  const { setCookie, removeCookie, getCookie } = useCookieHelper()
  const auth = ssrRef(null)
  const keycloakInstance = ref(null)

  const route = useRoute()
  const router = useRouter()

  const queryIsLoginProcess = !!route.value.query?.isLoginProcess
  const isLoginProcess = ssrRef(queryIsLoginProcess || false)

  if (queryIsLoginProcess) {
    let query = Object.assign({}, route.query)
    delete query.isLoginProcess
    router.replace({ query })
  }

  const isLoggedIn = computed(() => {
    return !!auth.value?.access_token
  })

  const setAuth = (newAuth) => {
    auth.value = newAuth
  }

  const removeCookiesAndDeleteAuthData = () => {
    logger.debug('removeCookiesAndDeleteAuthData')
    removeCookie('auth.accessToken')
    removeCookie('auth.refreshToken')
    removeCookie('auth.idToken')
    removeCookie('auth.validUntil')
    removeCookie('auth.tokenType')

    setAuth(null)
  }

  /** Keycloak instance is only created, when we are not logging in via OCI **/
  /** all functions only used with keycloakInstance.value have a prefix 'kc' */
  const createKeycloakInstance = () => {
    logger.debug('createKeycloakInstance')

    const { $config } = ctx
    if (!keycloakJS || keycloakInstance.value) {
      logger.debug('No keycloakJS or existing keycloakInstance')
      return
    }

    logger.debug('creating new keycloakInstance')

    const keyCloakBase = $config.KEYCLOAK_BASE_URL
    const keyCloakRealm = $config.KEYCLOAK_REALM_NAME
    const keyCloakClientId = $config.KEYCLOAK_CLIENT_ID

    //keycloakConfig, set the URL, realm, client
    const keycloakConfig = {
      url: keyCloakBase,
      realm: keyCloakRealm,
      clientId: keyCloakClientId,
    }
    let keycloakInitOptions = {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${getCurrentHostUrl()}/silentSsoCheck.html`,
      pkceMethod: 'S256',
      enableLogging: true,
      checkLoginIframe: true,
      checkLoginIframeInterval: 5,
      responseMode: 'query',
    }
    //keycloakInitOptions, how to check the SSO and security method for PKCE
    if (isLoggedIn.value) {
      keycloakInitOptions = {
        ...keycloakInitOptions,
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

    // if within access-token-lifespan no reload happens, this is needed.
    keycloakInstance.value.onTokenExpired = async () => {
      logger.debug('kcOnTokenExpired')
      const MIN_TOKEN_VALIDITY_IN_SECONDS = 30
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
      .then(() => logger.debug('Keycloak initialized'))
      .catch((reason) => logger.warn('init failed. reason: ', reason))
  }

  const forceTokenRefreshAndUpdate = async () => {
    try {
      logger.trace('forceTokenRefreshAndUpdate -> triggered by interceptor')
      // first call refresh function. Just to make sure our token was not just expired
      // -1 will force to update the token always. Does not matter if it was expired or not
      // this ensures "onAuthRefreshSuccess" runs always after we did this
      const refreshed = await keycloakInstance?.value?.updateToken(-1)
      logger.trace(
        'forceTokenRefreshAndUpdate -> updateToken call did update token',
        refreshed
      )
    } catch (error) {
      logger.error('forceTokenRefreshAndUpdate -> failed', error)
      throw error
    }
  }

  const kcOnAuthSuccess = async () => {
    logger.debug('kcOnAuthSuccess')
    isLoginProcess.value = true

    const token = reconstructToken()
    setCookiesAndSaveAuthData(token)

    isLoginProcess.value = false
  }

  const kcOnAuthLogout = async () => {
    logger.debug('kcOnAuthLogout')
    removeCookiesAndDeleteAuthData()
    const { app } = ctx
    const { localePath } = app
    return router.push(localePath('/'))
  }

  const setCookiesAndSaveAuthData = (token) => {
    logger.debug('setCookiesAndSaveAuthData')
    logger.trace('setCookiesAndSaveAuthData::TOKEN ', token)
    setCookie(
      'auth.accessToken',
      token.access_token,
      new Date(token.validUntil)
    )
    setCookie(
      'auth.refreshToken',
      token.refresh_token,
      new Date(token.refresh_expires_in)
    )
    setCookie(
      'auth.idToken',
      token.id_token,
      new Date(token.refresh_expires_in)
    )
    setCookie('auth.validUntil', token.validUntil, new Date(token.validUntil))
    setCookie('auth.tokenType', token.token_type, new Date(token.validUntil))

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

  const readAuthFromCookie = () => {
    const authFromCookie = {
      access_token: getCookie('auth.accessToken'),
      refresh_token: getCookie('auth.refreshToken'),
      id_token: getCookie('auth.idToken'),
      validUntil: getCookie('auth.validUntil'),
      token_type: getCookie('auth.tokenType'),
    }

    if (authFromCookie.access_token) {
      logger.debug('Token from cookie', authFromCookie)
      setAuth(authFromCookie)
    } else {
      logger.debug('Error when loading cookies', authFromCookie)
      setAuth(null)
    }
  }

  onBeforeMount(readAuthFromCookie)
  onServerPrefetch(readAuthFromCookie)

  return {
    keycloakInstance,
    auth,
    isLoggedIn,
    isLoginProcess,
    createKeycloakInstance,
    setCookiesAndSaveAuthData,
    removeCookiesAndDeleteAuthData,
    forceTokenRefreshAndUpdate,
  }
}
