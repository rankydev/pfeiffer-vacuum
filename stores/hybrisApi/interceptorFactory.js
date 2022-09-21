import { useAuthStore } from '~/stores/auth'
const qs = require('qs')
import getLoggerFor from '~/utils/getLoggerFor'

const logger = getLoggerFor('interceptorFactory')

export function getInterceptors() {
  const authStore = useAuthStore()

  const addAuthHeader = function (config) {
    logger.debug('addAuthHeader', authStore.loggedIn)

    if (authStore.loggedIn) {
      const authObject = authStore.auth
      logger.trace('AuthObject: ', authObject)
      config.headers.Authorization = `${authObject.token_type} ${authObject.access_token}`
      logger.trace('Authorization Header Set')
    }

    logger.trace('Headers: ', config.headers)
    return config
  }

  const addI18nParameters = function (config) {
    config.params = config.params || {}
    // TODO language and currency?
    // if (!config.params.lang) {
    //   config.params.lang = store.language
    // }
    // if (!config.params.curr) {
    //   config.params.curr = store.currency
    // }
  }

  /**
   * Interceptor to inject data into the shop requests
   * @param config
   * @return config
   */
  function onFulfilledRequestHandler(config) {
    config.paramsSerializer = (params) =>
      // TODO we can probably write this ourselves and replace this dependency
      qs.stringify(params, { arrayFormat: 'brackets' })

    addI18nParameters(config)
    return addAuthHeader(config)
  }

  function onRejectedRequestHandler(error) {
    logger.error('Auth error:', error, error.config ? error.config : null)
    return Promise.resolve(error)
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
    return Promise.resolve(error.response)
  }

  return {
    shop: {
      fulfilledRequest: onFulfilledRequestHandler,
      rejectedRequest: onRejectedRequestHandler,
      fulfilledResponse: onFulfilledResponseHandler,
      rejectedResponse: onRejectedResponseHandler,
    },
  }
}

/**
 * Log errors of error response
 * @param error response errors
 */
function logResponseError(error) {
  enhanceResponseError(error)

  const config4log = getConfig4log(error.config || {})

  if (
    error.response.data &&
    typeof error.response.data !== 'string' &&
    error.shop
  ) {
    error.response.data.error = error.toJSON()
    error.response.data.status = error.response.status
    error.response.data.statusText = error.response.statusText

    const requestId = error.shop.requestId ? `[${error.shop.requestId}]` : ''

    logger.error(
      'Error during shop request',
      requestId,
      `HTTP Status ${error.shop.status}`,
      config4log
    )
    logger.error(error.shop.stackTrace)
    return
  }

  error.response = { data: { error: error.toJSON ? error.toJSON() : null } }

  logger.error('Shop connection error:', error, config4log)
}

/**
 * Enhance error response with specific information for logging
 * @param error response with error
 */
function enhanceResponseError(error) {
  error.response = error.response || {}

  error.response.error = error.response.error || error.code

  error.shop = {
    status: error.response.status,
    statusText: error.response.statusText,
    errors: error.response.data ? error.response.data.errors : undefined,
  }

  // get request id from response
  if (error.shop.errors && error.shop.errors.length) {
    error.shop.requestId = error.shop.errors[0].requestId
  }

  if (error.shop.errors) {
    error.shop.stackTrace = error.shop.errors
      .filter((e) => e.stackTrace)
      .map((e) => e.stackTrace)
      .join('\n\n')
  }
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
