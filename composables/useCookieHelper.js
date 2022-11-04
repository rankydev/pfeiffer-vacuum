import { useContext } from '@nuxtjs/composition-api'
import Cookie from 'cookie'
import JsCookie from 'js-cookie'
import { useLogger } from './useLogger'

export const useCookieHelper = () => {
  const { logger } = useLogger('cookieHelper')
  const context = useContext()

  /**
   * Loads a cookie value by key
   *
   * @param context (required)
   * @param cookieKey (required)
   * @param defaultValue is returned if no cookie set
   * @return {string} value or defaultValue
   */
  const getCookie = (cookieKey, defaultValue) => {
    const { req } = context
    if (process.client) {
      return JsCookie.get(cookieKey) || defaultValue
    } else if (req && req.headers?.cookie) {
      const cookies = Cookie.parse(req.headers.cookie)
      const value = cookies[cookieKey]
      if (value) return value
      removeCookie(cookieKey)
    }

    return defaultValue
  }

  /**
   * Set a cookie by key and value
   *
   * @param cookieKey (required)
   * @param cookieValue (required)
   * @param expiresAt (optional)
   */
  const setCookie = (cookieKey, cookieValue, expiresAt) => {
    const { res } = context

    logger.debug(`Setting cookie "${cookieKey}" : "${cookieValue}"`)
    if (!cookieValue || cookieValue === 'undefined' || cookieValue === 'null') {
      logger.debug(`No cookieValue to save for cookie "${cookieKey}"`)
      // we do not want to save null or undefined value
      return
    }

    const cookieOptions = {
      expires: expiresAt,
      path: '/',
      sameSite: 'lax',
      secure: true,
    }

    logger.trace(
      `Cookie "${cookieKey}" : "${cookieValue}" with `,
      cookieOptions
    )

    if (process.client) {
      JsCookie.set(cookieKey, cookieValue, cookieOptions)
    } else if (res) {
      let headers = res.getHeader('Set-Cookie') || []
      if (typeof headers === 'string') {
        headers = [headers]
      }

      const redirectCookie = Cookie.serialize(
        cookieKey,
        cookieValue,
        cookieOptions
      )
      headers.push(redirectCookie)

      res.setHeader('Set-Cookie', headers)
    }
  }

  const removeCookie = (cookieKey) => {
    const { res } = context

    logger.debug(`Removing cookie "${cookieKey}"`)

    const date = new Date()
    const cookieOptions = {
      expires: date,
      path: '/',
    }
    if (process.client) {
      JsCookie.remove(cookieKey, cookieOptions)
    } else if (res) {
      try {
        let headers = res.getHeader('Set-Cookie') || []
        if (typeof headers === 'string') {
          headers = [headers]
        }
        const redirectCookie = Cookie.serialize(cookieKey, null, cookieOptions)
        headers.push(redirectCookie)
        res.setHeader('Set-Cookie', headers)
      } catch (err) {
        logger.warn(err.message)
      }
    }
  }

  return { getCookie, setCookie, removeCookie }
}
