import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'
import { results } from './mock'

export const useEmpolisStore = defineStore('empolis', () => {
  const productDownloads = ref(new Map())

  const getProductDownloads = (orderNumber) => {
    if (!productDownloads.value.has(orderNumber)) {
      productDownloads.value.set(orderNumber, results)
    }
    return productDownloads.value.get(orderNumber)
  }

  return {
    productDownloads,
    getProductDownloads,
  }
})
