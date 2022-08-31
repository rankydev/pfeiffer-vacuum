import Vue from 'vue'

import { getProductApi } from './productApi/productApi'
import { getContactApi } from './contactApi/contactApi'
import { getCountriesApi } from './countriesApi/countriesApi'
import { getUserApi } from './userApi/userApi'
import { getCartApi } from './cartApi/cartApi'
import { getInterceptors } from './interceptorFactory'

export function getHybrisApi(ctx) {
  const { $axios } = ctx

  const api = $axios.create()
  api.setBaseURL(process.env.SHOP_BASE_URL)
  api.setHeader('Content-Type', 'application/json')

  const interceptors = getInterceptors()

  // assign interceptors
  api.interceptors.request.use(
    interceptors.shop.fulfilledRequest,
    interceptors.shop.rejectedRequest
  )
  api.interceptors.response.use(
    interceptors.shop.fulfilledResponse,
    interceptors.shop.rejectedResponse
  )

  return {
    productApi: getProductApi(api, ctx),
    contactApi: getContactApi(api, ctx),
    countriesApi: getCountriesApi(api, ctx),
    userApi: getUserApi(api, ctx),
    cartApi: getCartApi(api, ctx),
    axiosInstance: api,
  }
}

export default (ctx) => {
  const { app } = ctx
  const hybrisApi = getHybrisApi(ctx)

  // Inject Hybris API into the Vue instance to use it client side
  Vue.prototype.$hybrisApi = hybrisApi

  app.$hybrisApi = hybrisApi
  ctx.$hybrisApi = hybrisApi
}
