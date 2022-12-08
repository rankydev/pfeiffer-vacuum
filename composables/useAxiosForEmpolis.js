import { useContext, useRouter } from '@nuxtjs/composition-api'
import { joinURL } from 'ufo'
import { useAxiosInterceptors } from './useAxiosInterceptors'
import { useContextUtil } from '~/composables/useContextUtil'
import { PATH_EMPOLIS } from '~/server/constants'

let axios = null

export const useAxiosForEmpolis = () => {
  const { req, $axios, $config } = useContext()
  const router = useRouter()
  const { getCurrentHostUrl } = useContextUtil()

  const createAxios = () => {
    const instance = $axios.create({
      timeout: parseInt($config.EMPOLIS_TIMEOUT),
    })
    const basePath = joinURL(
      getCurrentHostUrl(),
      router.options.base,
      PATH_EMPOLIS,
      'environments',
      $config.EMPOLIS_STAGE
    )
    instance.setBaseURL(basePath)
    instance.setHeader('Content-Type', 'application/json')

    const { fulfilledRequest, rejectedRequest } = useAxiosInterceptors()

    instance.interceptors.request.use(fulfilledRequest, rejectedRequest)
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
