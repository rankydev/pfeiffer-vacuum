import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

export default (context) => {
  return {
    httpEndpoint: () => {
      const { req } = context
      if (req) {
        // server side
        return req.protocol + '://' + req.get('host')
      }
      if (window) {
        // client side
        return window.location.protocol + '//' + window.location.host
      }
    },
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
