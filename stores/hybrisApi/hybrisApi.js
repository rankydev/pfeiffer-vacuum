import { defineStore } from 'pinia'
import createNuxtStore from '../createNuxtStore'
import { getProductApi } from './productApi/productApi'
import { getContactApi } from './contactApi/contactApi'
import { getCountriesApi } from './countriesApi/countriesApi'
import { getUserApi } from './userApi/userApi'
import { getInterceptors } from './interceptorFactory'

export const useHybrisApiStore = createNuxtStore((ctx) =>
  defineStore('hybrisApi', () => {
    const api = ctx.$axios.create()
    api.setBaseURL(process.env.SHOP_BASE_URL)
    api.setHeader('Content-Type', 'application/json')

    const interceptors = getInterceptors(ctx)

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
      axiosInstance: api,
    }
  })
)
