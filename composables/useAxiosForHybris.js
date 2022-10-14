import { useContext } from '@nuxtjs/composition-api'
import { useAxiosInterceptors } from './useAxiosInterceptors'

let axios = null

export const useAxiosForHybris = () => {
  const { req, $axios } = useContext()

  const createAxios = () => {
    const instance = $axios.create()
    instance.setBaseURL(process.env.SHOP_BASE_URL)
    instance.setHeader('Content-Type', 'application/json')

    const {
      fulfilledRequest,
      rejectedRequest,
      fulfilledResponse,
      rejectedResponse,
    } = useAxiosInterceptors()

    instance.interceptors.request.use(fulfilledRequest, rejectedRequest)
    instance.interceptors.response.use(fulfilledResponse, rejectedResponse)
    return instance
  }

  if (req) {
    if (!req.axios) {
      req.axios = createAxios()
    }
    return { axios: req.axios }
  }

  if (!axios) {
    axios = createAxios()
  }
  return { axios }
}
