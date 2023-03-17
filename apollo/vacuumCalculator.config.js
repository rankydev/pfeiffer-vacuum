import { setContext } from 'apollo-link-context'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { PATH_VACUUM_CALC } from '~/server/constants.js'

export default (context) => {
  const { $config } = context
  const { CURRENT_REGION_CODE, baseURL } = $config

  const authLink = setContext(async (_, { headers }) => {
    const userStore = useUserStore()
    const { auth } = storeToRefs(userStore)
    const authHeader =
      $config.NODE_ENV === 'development' ? 'authorization-gql' : 'Authorization'
    return {
      headers: {
        ...headers,
        [authHeader]: `${auth.value?.token_type} ${auth.value?.access_token}`,
      },
    }
  })

  return {
    httpEndpoint: baseURL,
    browserHttpEndpoint: `/${CURRENT_REGION_CODE}${PATH_VACUUM_CALC}/graphql`,
    httpLinkOptions: {
      headers: {
        // TODO this doesn't work right now because somehow i18n is not available at that point
        'Accept-Language': context.app?.i18n?.locale === 'de' ? 'de' : 'en',
      },
    },
    link: authLink,
  }
}
