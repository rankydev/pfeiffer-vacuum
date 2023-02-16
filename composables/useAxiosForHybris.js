import { useContext, useRouter } from '@nuxtjs/composition-api'
import { joinURL } from 'ufo'
import { useAxiosInterceptors } from './useAxiosInterceptors'
import { PATH_SHOP } from '~/server/constants'
import { useContextUtil } from '~/composables/useContextUtil'

let axios = null

export const useAxiosForHybris = () => {
  const { req, $axios } = useContext()
  const router = useRouter()
  const { getCurrentHostUrl } = useContextUtil()

  const createAxios = () => {
    const instance = $axios.create()
    const basePath = joinURL(
      getCurrentHostUrl(),
      router.options.base,
      PATH_SHOP
    )
    instance.setBaseURL(basePath)
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
    if (!req.axiosForHybris) {
      req.axiosForHybris = createAxios()
    }
    return { axios: req.axiosForHybris }
  }

  if (!axios) {
    axios = createAxios()
  }
  return { axios }
}
