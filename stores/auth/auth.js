import { defineStore } from 'pinia'
import createNuxtStore from '../createNuxtStore'
import { useOciStore } from '~/stores/oci'
import getLoggerFor from '~/utils/getLoggerFor'
import { useHybrisApiStore } from '~/stores/hybrisApi'
import { setCookie, removeCookie } from '~/plugins/cookieHelper'
const keycloakJS = typeof window !== 'undefined' ? require('keycloak-js') : null

const logger = getLoggerFor('authStore')

export const useAuthStore = createNuxtStore((ctx) =>
  defineStore('auth', {
    state: () => ({
      auth: null,
      isLoginProcess: false,
      currentUser: null,
      keycloak: null,
    }),

    getters: {
      isOciUser(state) {
        return state.auth?.type === 'oci'
      },
      isOpenUser(state) {
        return state.currentUser?.registrationStatus?.code === 'OPEN'
      },
      isLeadUser(state) {
        return state.currentUser?.registrationStatus?.code === 'LEAD'
      },
      isRejectedUser(state) {
        return state.currentUser?.registrationStatus?.code === 'REJECTED'
      },
      isApprovedUser(state) {
        return state.currentUser?.registrationStatus?.code === 'APPROVED'
      },
      loggedIn(state) {
        return !!state.auth?.access_token
      },
      keycloakInstance(state) {
        if (!state.keycloak) {
          this.createKeycloakInstance()
        }

        return state.keycloak
      },
    },

    actions: {
      async loadCurrentUser() {
        if (!this.loggedIn) {
          return
        }
        const hybrisApiStore = useHybrisApiStore(ctx)
        const user = await hybrisApiStore.userApi.getUserData()
        if (user && !user.error) {
          this.currentUser = user
        } else {
          logger.error('user not found', user || '')
        }
      },

      setAuth(auth) {
        this.auth = auth
        //load currentUser data if currentUser obj is empty
        if (auth && !this.currentUser) {
          this.loadCurrentUser()
        }

        if (!auth) {
          this.currentUser = null
        }
      },

      async login() {
        logger.debug('login')
        const url = window.location.href
        // TODO do we need the locale?
        const options = { locale: 'store.currentLanguage', redirectUri: url }
        await this.keycloakInstance.login(options)
      },

      async logout() {
        logger.debug('logout')

        // remove internal data
        this.removeCookiesAndDeleteAuthData()

        if (this.keycloakInstance) {
          // no redirect needed here, since onAuthLogout from keycloak takes care of this.
          await this.keycloakInstance.logout()
        } else {
          // redirect here, if no keycloak instance is available.
          const { app } = ctx
          const { localePath, router } = app
          return router.push(localePath({ name: 'shop' }))
        }
      },

      removeCookiesAndDeleteAuthData() {
        logger.debug('removeCookiesAndDeleteAuthData')
        removeCookie(ctx, 'auth.accessToken')
        removeCookie(ctx, 'auth.refreshToken')
        removeCookie(ctx, 'auth.idToken')
        removeCookie(ctx, 'auth.validUntil')
        removeCookie(ctx, 'auth.tokenType')

        this.setAuth(null)
      },

      /** Keycloak instance is only created, when we are not logging in via OCI **/
      /** all functions only used with keycloak have a prefix 'kc' */
      createKeycloakInstance() {
        logger.debug('createKeycloakInstance')
        const ociStore = useOciStore()
        if (ociStore.isOciPage || this.isOciUser) {
          return
        }

        const { app, $contextUtil, $keycloakInstance } = ctx
        if (!keycloakJS || this.keycloak) {
          logger.debug('No keycloakJS or existing keycloakInstance')
          return
        }

        if ($keycloakInstance) {
          logger.debug('keycloakInstance from context')
          this.keycloak = $keycloakInstance
          return
        }

        if (app.$keycloakInstance) {
          logger.debug('keycloakInstance from app')
          this.keycloak = app.$keycloakInstance
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
        if (this.loggedIn) {
          keycloakInitOptions = {
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: `${$contextUtil.getCurrentHostUrl()}/silentSsoCheck.html`,
            pkceMethod: 'S256',
            enableLogging: true,
            checkLoginIframe: true,
            checkLoginIframeInterval: 5,
            responseMode: 'query',
            idToken: this.auth.id_token,
            refreshToken: this.auth.refresh_token,
            token: this.auth.access_token,
          }
          logger.trace('keycloakInitOptions with userdata', keycloakInitOptions)
        }

        this.keycloak = keycloakJS(keycloakConfig)

        //event listener for successful Keycloak authentication, start rest of login process
        this.keycloak.onAuthSuccess = this.kcOnAuthSuccess
        this.keycloak.onAuthError = this.removeCookiesAndDeleteAuthData
        //event listener for auto refresh Keycloak authentication, start rest of login without reloading user.
        this.keycloak.onAuthRefreshSuccess = this.kcOnAuthSuccess
        this.keycloak.onAuthRefreshError = this.removeCookiesAndDeleteAuthData
        this.keycloak.onAuthLogout = this.kcOnAuthLogout
        // only debug output
        if (process.env.CONSOLA_LEVEL >= 4) {
          this.keycloak.onReady = (authenticated) =>
            logger.debug(
              `kcOnReady::authenticated ${authenticated} and keycloak.authenticated=${this.keycloakInstance.authenticated}`
            )
        }

        const MIN_TOKEN_VALIDITY_IN_SECONDS = 30

        // if within access-token-lifespan no reload happens, this is needed.
        this.keycloak.onTokenExpired = async () => {
          logger.debug('kcOnTokenExpired')
          this.keycloak
            .updateToken(MIN_TOKEN_VALIDITY_IN_SECONDS)
            .then((refreshed) =>
              logger.debug(
                'token refresh happen. Token was refreshed:',
                refreshed
              )
            )
            .catch((reason) =>
              logger.info(
                'token refresh failed due to session timeout or ',
                reason
              )
            )
        }

        this.keycloak
          .init(keycloakInitOptions)
          .catch((reason) => logger.warn('init failed. reason: ', reason))
        logger.debug('Keycloak initialized')

        app.$keycloakInstance = this.keycloak
      },

      kcRedirect(query) {
        logger.debug('kcRedirect')
        logger.trace(
          'kcRedirect:: authenticated, ',
          this.keycloak.authenticated
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
      },

      async kcOnAuthSuccess() {
        logger.debug('kcOnAuthSuccess', this)
        this.isLoginProcess = true
        const canAccessApprovedCustomerFunctionality =
          this.keycloak.hasRealmRole('customer_ecommerce')

        if (!canAccessApprovedCustomerFunctionality) {
          const unverified = this.keycloak.tokenParsed?.email
          this.removeCookiesAndDeleteAuthData()
          return kcRedirect(unverified && { unverified })
        }

        const token = this.reconstructToken()
        await this.setCookiesAndSaveAuthData(token)

        this.isLoginProcess = false
      },

      async kcOnAuthLogout() {
        logger.debug('kcOnAuthLogout')
        this.removeCookiesAndDeleteAuthData()
        const { app } = ctx
        const { localePath, router } = app
        return router.push(localePath({ name: 'shop' }))
      },

      setCookiesAndSaveAuthData(token) {
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

        this.setAuth(token)
      },

      reconstructToken() {
        logger.debug('reconstructToken')
        if (!this.keycloakInstance) {
          return {}
        }

        const expTimestampAccessToken =
          this.keycloakInstance.tokenParsed.exp * 1000
        const expTimestampRefreshToken =
          this.keycloakInstance.refreshTokenParsed.exp * 1000
        return {
          access_token: this.keycloakInstance.token,
          refresh_token: this.keycloakInstance.refreshToken,
          id_token: this.keycloakInstance.idToken,
          token_type: 'Bearer',
          session_state: this.keycloakInstance.tokenParsed.session_state,
          validUntil: expTimestampAccessToken,
          refresh_expires_in: expTimestampRefreshToken,
          scope: 'openid profile email',
        }
      },
    },
  })
)
