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

  /**
   * Interceptor to handle failed shop responses
   * @param error
   * @return resolved promise with error data
   */
  async function onRejectedResponseHandler(error) {
    // enhance and log error
    logResponseError(error)

    // always resolve error with enhanced response
    return Promise.reject(error.response)
  }

  /**
   * Log errors of error response
   * @param error response errors
   */
  function logResponseError(error) {
    const config4log = getConfig4log(error.config || {})
    if (error.response?.data && typeof error.response?.data !== 'string') {
      const requestId = `[${error.response.data.errors[0]?.requestId}]`

      logger.error(
        'Error during shop request',
        requestId,
        `HTTP Status ${error.response.status}`,
        config4log
      )
      logger.error(
        error.response.data.errors
          .filter((e) => e.stackTrace)
          .map((e) => e.stackTrace)
          .join('\n\n')
      )

      return
    }
    logger.error('Shop connection error:', error, config4log)
  }

  /**
   * Returns reduced config object for erro logging
   * @param config object of error response
   */
  function getConfig4log(config) {
    const configLog = { ...config } // copy

    // remove irrelevant objects for error logging
    delete configLog.adapter
    delete configLog.httpsAgent
    delete configLog.validateStatus
    delete configLog.transformRequest
    delete configLog.transformResponse
    delete configLog.xsrfCookieName
    delete configLog.xsrfHeaderName

    return configLog
  }

  return {
    fulfilledRequest: onFulfilledRequestHandler,
    rejectedRequest: onRejectedRequestHandler,
    fulfilledResponse: onFulfilledResponseHandler,
    rejectedResponse: onRejectedResponseHandler,
  }
}
