import Vue from 'vue'

import { getProductApi } from './hybris/productApi'

export function getHybrisApi(ctx) {
  const { $axios, app } = ctx

  const api = $axios.create()
  api.setBaseURL(
    'https://api.cjgnymr4s2-pfeifferv1-d1-public.model-t.cc.commerce.ondemand.com/'
  )
  api.setHeader('Content-Type', 'application/json')

  return {
    productApi: getProductApi(api),
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
