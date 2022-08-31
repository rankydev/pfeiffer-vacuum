import { useAuthStore } from '~/stores/auth'
import { useOciStore } from '~/stores/oci'
import getLoggerFor from '../utils/getLoggerFor'

const logger = getLoggerFor('ociAuth')

export default async function (ctx) {
  logger.trace('start')
  const authStore = useAuthStore()
  const ociStore = useOciStore()
  const { app, query, route, $hybrisApi } = ctx
  const { username, password } = query

  logger.trace('Query: ', query)

  const isOciPage = app.localePath('shop-oci') === route.path
  // the value is stored, because the initialisation of the authApi is influenced by this information
  // if we have an OCI Login called on the OCI-page, the Keycloak must not be initialised.
  // Otherwise the two different login mechanism clash with each other the OCI functionality of this shop will break.
  ociStore.isOciPage = isOciPage

  // only react on oci page
  if (!isOciPage) {
    logger.trace('No OCI-page')
    // logout the user if a ssr request with an active oci session happens
    if (process.server && authStore.isOciUser) {
      logger.trace('Logout OCI-user')
      $hybrisApi.userApi.logout()
    }
    return
  }

  logger.trace('is OCI-page')

  // check if the required credentils are given
  if (!username || !password) {
    return
  }
  logger.trace('username and password given')

  // logout the user if he is already logged in
  if (authStore.loggedIn) {
    logger.trace('logout already logged-in user to ensure correct login')
    $hybrisApi.userApi.logout()
  }

  logger.trace('login with basic auth')
  // log the user in with the basic auth credentials
  await $hybrisApi.userApi.login(username, password)
  logger.trace('IsOciUser: ', authStore.isOciUser)
}
