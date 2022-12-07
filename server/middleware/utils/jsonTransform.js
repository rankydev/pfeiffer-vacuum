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
  const encodedToken = Buffer.from(base64, 'base64').toString('utf-8')
  const jsonPayload = decodeURIComponent(
    encodedToken
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return JSON.parse(jsonPayload) || {}
}
