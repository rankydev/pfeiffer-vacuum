// TODO do we really need this?
const Cookie = require('cookie')
const JsCookie = require('js-cookie')
import getLoggerFor from '../utils/getLoggerFor'

const logger = getLoggerFor('cookieHelper')
const COOKIE_EXPIRATION_DAYS = 365

/**
 * Loads a cookie value by key
 *
 * @param context (required)
 * @param cookieKey (required)
 * @param defaultValue is returned if no cookie set
 * @return {string} value or defaultValue
 */
export function getCookie(context, cookieKey, defaultValue) {
  const { req } = context
  if (process.client) {
    return JsCookie.get(cookieKey) || defaultValue
  } else if (req && typeof req.headers.cookie !== 'undefined') {
    const cookies =
      req.headers && req.headers.cookie ? Cookie.parse(req.headers.cookie) : {}
    const value = cookies[cookieKey]
    if (value) {
      if (value === 'undefined' || value === 'null') {
        removeCookie(context, cookieKey)
      } else {
        return value
      }
    }
  }

  return defaultValue
}

/**
 * Set a cookie by key and value
 *
 * @param context (required)
 * @param cookieKey (required)
 * @param cookieValue (required)
 * @param expiresAt (optional)
 */
export function setCookie(context, cookieKey, cookieValue, expiresAt) {
  const { res } = context

  logger.debug(`Setting cookie "${cookieKey}" : "${cookieValue}"`)
  if (!cookieValue || cookieValue === 'undefined' || cookieValue === 'null') {
    logger.debug(`No cookieValue to save for cookie "${cookieKey}"`)
    // we do not want to save null or undefined value
    return
  }

  const date = new Date()
  const cookieOptions = {
    expires:
      expiresAt ||
      new Date(date.setDate(date.getDate() + COOKIE_EXPIRATION_DAYS)),
    path: '/',
    sameSite: 'lax',
    secure: true,
  }

  logger.trace(`Cookie "${cookieKey}" : "${cookieValue}" with `, cookieOptions)

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

export function removeCookie(context, cookieKey) {
  const { res } = context

  logger.debug(`Removing cookie "${cookieKey}"`)

  const date = new Date()
  const cookieOptions = {
    expires: new Date(date.setDate(date.getDate() + COOKIE_EXPIRATION_DAYS)),
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
