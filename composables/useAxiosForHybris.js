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

    const { fulfilledRequest, rejectedRequest, fulfilledResponse } =
      useAxiosInterceptors()

    instance.interceptors.request.use(fulfilledRequest, rejectedRequest)
    // do not use rejectedResponse interceptor because we are using refreshAuthLogic now to try to fix token
    // "refreshAuthLogic" would not be called when we intercept here with "rejectedResponse" because it uses the same "interceptors.response.use()"
    instance.interceptors.response.use(fulfilledResponse)

    // intercept failed requests with 401 with our refresh logic to try to fix missing or old accessToken
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
