import { useContext } from '@nuxtjs/composition-api'
import { useLogger } from './useLogger'

export const useContextUtil = () => {
  const { logger } = useLogger('contextUtil')

  const getCurrentHostUrl = () => {
    const { req } = useContext()

    if (req) {
      // server side
      return req.protocol + '://' + req.headers.host
    }
    if (window) {
      // client side
      return window.location.protocol + '//' + window.location.host
    }
    logger.error('Error getting current host url.')
    return null
  }

  return { getCurrentHostUrl }
}
