import { useContext, useRouter } from '@nuxtjs/composition-api'
import { joinURL } from 'ufo'
import { useContextUtil } from '~/composables/useContextUtil'
import { PATH_DATASOURCES } from '~/server/constants'

let axios = null

export const useAxiosForDatasources = () => {
  const { req, $axios } = useContext()
  const router = useRouter()
  const { getCurrentHostUrl } = useContextUtil()

  const createAxios = () => {
    const instance = $axios.create()
    const basePath = joinURL(
      getCurrentHostUrl(),
      router.options.base,
      PATH_DATASOURCES
    )
    instance.setBaseURL(basePath)
    instance.setHeader('Content-Type', 'application/json')
    return instance
  }

  if (req) {
    if (!req.axiosForDatasources) {
      req.axiosForDatasources = createAxios()
    }
    return { axios: req.axiosForDatasources }
  }

  if (!axios) {
    axios = createAxios()
  }
  return { axios }
}
