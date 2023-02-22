import { useContext } from '@nuxtjs/composition-api'
import { useLogger } from './useLogger'

export const useContextUtil = () => {
  const { logger } = useLogger('contextUtil')

  const getCurrentHostUrl = () => {
    const { req } = useContext()

    if (req) {
      let protocol = req.protocol
      if (!protocol) {
        protocol = req.headers['x-forwarded-proto']
      }
      logger.trace('Request::Protocol: ', protocol)
      if (!protocol) {
        logger.trace('Did not find protocol for request: ', req)
      }
      // server side
      return protocol + '://' + req.headers.host
    }
    if (window) {
      logger.trace('Window::Protocol: ', window.location.protocol)
      // client side
      return window.location.protocol + '//' + window.location.host
    }
    logger.error('Error getting current host url.')
    return null
  }

  return { getCurrentHostUrl }
}
