import { useContext } from '@nuxtjs/composition-api'
import qs from 'qs'
import { useUserStore } from '~/stores/user'
import { useLogger } from './useLogger'
import { useCookieHelper } from '~/composables/useCookieHelper'

export const useAxiosInterceptors = () => {
  const { logger } = useLogger('useAxiosInterceptors')
  const { i18n } = useContext()
  const userStore = useUserStore()
  const { getCookie } = useCookieHelper()

  const addAuthHeader = function (config) {
    logger.debug('addAuthHeader', userStore.isLoggedIn)

    if (userStore.isLoggedIn) {
      // use auth values from cookie instead of store. This might be more bullet proof since cookies are shared between tabs and store is not
      config.headers.Authorization = `${getCookie(
        'auth.tokenType'
      )} ${getCookie('auth.accessToken')}`
      logger.trace('Authorization Header set from cookie values')
    }

    logger.trace('Headers: ', config.headers)
    return config
  }

  const addI18nParameters = function (config) {
    config.params = config.params || {}

    if (!config.params.lang) {
      config.params.lang = i18n.locale
    }
    // TODO We don't have the currency configured yet
    // if (!config.params.curr) {
    //   config.params.curr = i18n.currency
    // }
  }

  /**
   * Interceptor to inject data into the shop requests
   * @param config
   * @return config
   */
  function onFulfilledRequestHandler(config) {
    config.paramsSerializer = (params) =>
      qs.stringify(params, { arrayFormat: 'brackets' })

    addI18nParameters(config)
    return addAuthHeader(config)
  }

  function onRejectedRequestHandler(error) {
    logger.error('Auth error:', error, error.config ? error.config : null)
    return Promise.reject(error)
  }

  /**
   * Interceptor to handle successful shop responses
   * @param response
   * @return response
   */
  function onFulfilledResponseHandler(response) {
    logger.trace('Shop Response', response.status, response.config.url)
    logger.trace(response.config)
    logger.trace(response.data)

    return response
  }

  return {
    fulfilledRequest: onFulfilledRequestHandler,
    rejectedRequest: onRejectedRequestHandler,
    fulfilledResponse: onFulfilledResponseHandler,
  }
}
