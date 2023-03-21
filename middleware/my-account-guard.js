import Cookie from 'cookie'
import JsCookie from 'js-cookie'

export default ({ app, req, redirect }) => {
  const getCookie = (cookieKey, defaultValue) => {
    if (process.client) {
      return JsCookie.get(cookieKey) || defaultValue
    } else if (req?.headers?.cookie) {
      const cookies = Cookie.parse(req.headers.cookie)
      const value = cookies[cookieKey]
      if (value) return value
    }
    return defaultValue
  }

  // unfortunately pinia (user) store does not work properly with getters in here right now. (nuxt bridge)
  // So we need to check the access_token directly instead of using the handy getter "isLoggedIn"
  const accessToken = getCookie('auth.accessToken', '')
  const idToken = getCookie('auth.idToken', '')

  // if we have an idToken but no accessToken it means refreshing the accessToken failed but we should still have a valid login session
  // so force browser reload to init keycloak again and set cookies again through the new init
  if (!accessToken && idToken) {
    if (process.client) {
      return window.location.reload()
    }
  }

  // user is not logged in and must not reach my account
  if (!accessToken && !idToken) {
    return redirect(app.localePath('/'))
  }
}
