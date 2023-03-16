import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

export default () => {
  return {
    httpEndpoint: 'https://dev2.pvac.diva-e.com',
    browserHttpEndpoint: '/api/vacuumCalc/graphql',
    httpLinkOptions: {
      headers: {
        // TODO LANG
        'Accept-Language': 'en',
      },
    },
    getAuth: () => {
      const userStore = useUserStore()
      const { auth } = storeToRefs(userStore)

      // eslint-disable-next-line camelcase
      return auth.value
        ? `${auth.value?.token_type} ${auth.value?.access_token}`
        : null
    },
  }
}
