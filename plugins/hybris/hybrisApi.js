import Vue from 'vue'

import { getProductApi } from './productApi/productApi'
import { getContactApi } from './contactApi/contactApi'

export function getHybrisApi(ctx) {
  const { $axios } = ctx

  const api = $axios.create()
  api.setBaseURL(process.env.SHOP_BASE_URL)
  api.setHeader('Content-Type', 'application/json')

  return {
    productApi: getProductApi(api, ctx),
    contactApi: getContactApi(api, ctx),
    axiosInstance: api,
  }
}

export default (ctx) => {
  const { app, store } = ctx
  const hybrisApi = getHybrisApi(ctx)

  // Inject Hybris API into the Vue instance to use it client side
  Vue.prototype.$hybrisApi = hybrisApi

  app.$hybrisApi = hybrisApi
  ctx.$hybrisApi = hybrisApi
  if (store) {
    store.$hybrisApi = hybrisApi
  }
}
