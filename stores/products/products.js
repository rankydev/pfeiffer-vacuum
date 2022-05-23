import { defineStore } from 'pinia/dist/pinia.mjs'

export const useProductStore = defineStore('product', {
  getters: {
    getProductById: (state) => {
      return (productId) =>
        state.products.find((product) => product.id === productId)
    },
    getAllProducts: (state) => {
      return state.products
    },
  },
})
