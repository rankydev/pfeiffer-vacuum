import { useLogger } from '../../../composables/useLogger'
const { logger } = useLogger('onProxyReq')

export const removeCookie = (proxyReq) => {
  try {
    if (proxyReq.getHeader('cookie')) {
      proxyReq.removeHeader('cookie')
    }
  } catch (e) {
    logger.error(e)
  }
}
