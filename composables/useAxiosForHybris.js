import { useContext } from '@nuxtjs/composition-api'
import { useAxiosInterceptors } from './useAxiosInterceptors'

export const useAxiosForHybris = () => {
  const ctx = useContext()
  const axios = ctx.$axios.create()
  axios.setBaseURL(process.env.SHOP_BASE_URL)
  axios.setHeader('Content-Type', 'application/json')

  const {
    fulfilledRequest,
    rejectedRequest,
    fulfilledResponse,
    rejectedResponse,
  } = useAxiosInterceptors()

  axios.interceptors.request.use(fulfilledRequest, rejectedRequest)
  axios.interceptors.response.use(fulfilledResponse, rejectedResponse)

  return { axios }
}
