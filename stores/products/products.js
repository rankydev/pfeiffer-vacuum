import { defineStore } from 'pinia'

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
