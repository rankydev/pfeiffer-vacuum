import { useContext, useRouter } from '@nuxtjs/composition-api'
import { joinURL } from 'ufo'
import { useAxiosInterceptors } from './useAxiosInterceptors'
import { PATH_SHOP } from '~/server/constants'
import { useContextUtil } from '~/composables/useContextUtil'
import { useUserStore } from '~/stores/user'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

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
      // rejectedResponse,
    } = useAxiosInterceptors()

    instance.interceptors.request.use(fulfilledRequest, rejectedRequest)
    // do not use rejectedResponse interceptor because we are using refreshAuthLogic now to try to fix token
    // For some reason "refreshAuthLogic" is not called when we intercept here with "rejectedResponse"
    instance.interceptors.response.use(fulfilledResponse)

    const refreshAuthLogic = async () => {
      const userStore = useUserStore()
      await userStore.forceTokenRefreshAndUpdate()
    }
    createAuthRefreshInterceptor(instance, refreshAuthLogic)

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
