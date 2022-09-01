import Vue from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useVsmStore } from '~/stores/vsm'

// TODO we need apollo client first
// import profile from '../apollo/queries/profile.gql'

function getVsmApi(ctx) {
  const { $contextUtil, $axios, app, getLoggerFor } = ctx
  const logger = getLoggerFor('vsmApi')
  const authStore = useAuthStore()
  const vsmStore = useVsmStore()

  // const vsmUrl = $contextUtil.getCurrentHostUrl() + process.env.PROXY_PATH_VSM
  const vsmUrl = 'https://staging-vsm.pfeiffer-vacuum.com'

  const axios = $axios.create({
    timeout: parseInt(process.env.SHOP_TIMEOUT),
    baseURL: vsmUrl,
  })

  /*
   * Exchange a SSO-token (Keycloak) for an access token from VSM
   * If the user is not known in VSM, the user will be created in VSM (default)
   * if createVsmUser = 'false' the user will not be created in VSM
   */

  const getVsmToken = async function getVsmToken(createVsmUser) {
    logger.debug('getVsmToken')
    const vsmIsActive = process.env.SERVICE_PORTAL_ACTIVE === 'true'
    const { $keycloakInstance } = ctx
    if (!vsmIsActive || !$keycloakInstance || !authStore.loggedIn) {
      // if this message occurs in the logs, the prerequisites for VSM login are not met
      // and there is a flaw in the workflow for logging in to VSM.
      // A VSM token can only be obtained if the user is logged in via Keycloak first.
      logger.info(
        `keycloakInstance not available (${!$keycloakInstance}) or user not logged in (${!authStore.loggedIn}). VSM token cannot be obtained.`
      )
      return
    }
    if (!$keycloakInstance.hasRealmRole('customer_vsm')) {
      return
    }

    const params = new URLSearchParams()
    if (!createVsmUser) {
      params.append('createVsmUser', 'false')
    }

    const authObject = authStore.auth
    const config = {
      headers: {
        // eslint-disable-next-line camelcase
        Authorization: `${authObject.token_type} ${authObject.access_token}`,
        'Content-Type': 'application/json',
      },
    }

    return axios
      .post('/sso/token', params, config)
      .then((res) => {
        logger.debug('Fetched a VSM token')
        logger.trace('Response for VSM token:', res)

        const data = res.data
        // eslint-disable-next-line camelcase
        const vsmAccessToken = data?.access_token

        if (vsmAccessToken) {
          const props = {
            registered: true,
            token: vsmAccessToken,
            userId: data?.user?.id,
            userObject: data?.user,
          }
          vsmStore.setVsmUser(props)
          logger.trace('Set VSM user-data', vsmAccessToken)
        }

        return data
      })
      .catch((err) => {
        logger.error('Error fetching VSM token', err && err.message ? err : '')
        vsmStore.setVsmUser(null)
      })
  }

  // const getUserInboxComponentId = async function getUserInboxComponentId() {
  //   return app.apolloProvider.defaultClient
  //     .query({
  //       query: profile,
  //     })
  //     .then(({ data }) => {
  //       if (data && data.profile.inboxComponent.id) {
  //         return data.profile.inboxComponent.id
  //       }
  //     })
  // }

  return {
    getVsmToken,
    // getUserInboxComponentId,
  }
}

export default (ctx) => {
  const { app } = ctx
  const vsmApi = getVsmApi(ctx)

  // Inject VSM API into the Vue instance to use it client side
  Vue.prototype.$vsmApi = vsmApi

  app.$vsmApi = vsmApi
  ctx.$vsmApi = vsmApi
}
