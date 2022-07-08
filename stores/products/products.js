import { defineStore } from 'pinia'
import { useContext, useAsync } from '@nuxtjs/composition-api'

export const useProductStore = defineStore('product', {
  state: () => {
    return {
      products: [],
    }
  },

  getters: {
    getProductById: (state) => {
      return (productId) => {
        if (!state.products) return

        return (
          [...state.products].find((product) => product.code === productId) ||
          {}
        )
      }
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
