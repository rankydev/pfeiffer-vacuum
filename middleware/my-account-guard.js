export default (ctx) => {
  // on server side we cannot check if user is logged in so let user pass and onBeforeMount will check user is logged in initally
  if (!process.client) {
    return true
  }
  // while navigating onpage this check will be done every time a user wants to reach this route
  // unfortunately pinia (user) store does not work properly with getters in here right now. (nuxt bridge)
  // So we need to check the access_token directly instead of using the handy getter "isLoggedIn"
  const accessToken = ctx.app.pinia.state.value?.user?.auth?.access_token
  if (!accessToken) {
    return ctx.redirect(ctx.from?.path || '/')
  }
}
