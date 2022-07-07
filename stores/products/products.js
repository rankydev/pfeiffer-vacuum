import { defineStore } from 'pinia'
import { useFetch, useContext, useAsync } from '@nuxtjs/composition-api'

export const useProductStore = defineStore('product', {
  state: () => {
    return {
      products: [],
    }
  },

  getters: {
    getProductById: (state) => {
      return (productId) =>
        [...state.products].find((product) => product.code === productId) || {}
    },
    getAllProducts: (state) => {
      return state.products
    },
  },

  actions: {
    fetchProducts(productCodes) {
      const { $hybrisApi } = useContext()

      const products = useAsync(() =>
        $hybrisApi.productApi.getProducts(productCodes)
      )

      this.products = products.value
    },
  },
})
