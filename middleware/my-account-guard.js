import Cookie from 'cookie'
import JsCookie from 'js-cookie'

export default ({ req, redirect, from }) => {
  const getCookie = (cookieKey, defaultValue) => {
    if (process.client) {
      return JsCookie.get(cookieKey) || defaultValue
    } else if (req && req.headers?.cookie) {
      const cookies = Cookie.parse(req.headers.cookie)
      const value = cookies[cookieKey]
      if (value) return value
    }
    return defaultValue
  }

  // unfortunately pinia (user) store does not work properly with getters in here right now. (nuxt bridge)
  // So we need to check the access_token directly instead of using the handy getter "isLoggedIn"
  const accessToken = getCookie('auth.accessToken', '')
  if (!accessToken) {
    return redirect(from?.path || '/')
  }
}
