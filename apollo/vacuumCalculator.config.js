import { setContext } from 'apollo-link-context'
import { useUserStore } from '~/stores/user'
import { PATH_VACUUM_CALC } from '~/server/constants.js'

export default (context) => {
  const { $config } = context
  const { CURRENT_REGION_CODE, baseURL } = $config

  const authLink = setContext(async (_, { headers }) => {
    const userStore = useUserStore()
    const authHeader =
      $config.NODE_ENV === 'development' ? 'authorization-gql' : 'Authorization'
    return {
      headers: {
        ...headers,
        'Accept-Language': context?.i18n?.locale === 'de' ? 'de' : 'en',
        // use auth values from cookie instead of store. This might be more bullet proof since cookies are shared between tabs and store is not
        [authHeader]: userStore.authorizationFromCookie(),
      },
    }
  })

  return {
    httpEndpoint: `${baseURL}/${CURRENT_REGION_CODE}${PATH_VACUUM_CALC}/graphql`,
    link: authLink,
  }
}
