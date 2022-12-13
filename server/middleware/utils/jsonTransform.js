import { useLogger } from '../../../composables/useLogger'

const { logger } = useLogger('JSON-Transform')
/**
 * Short parse function for jwt
 * Use this instead of a new jwt dependency
 * See https://stackoverflow.com/a/38552302
 * @param token
 * @returns {any}
 */
export const parseJwt = (token) => {
  if (!(token || '').includes('.')) {
    return {}
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const decodedToken = Buffer.from(base64, 'base64').toString('utf-8')
  try {
    return JSON.parse(decodedToken)
  } catch (e) {
    logger.warn('Decoded Token could not be parsed. ', decodedToken)
    return {}
  }
}
