import { defineStore } from 'pinia'
import { ref, useContext } from '@nuxtjs/composition-api'
import { useAxiosForEmpolis } from '~/composables/useAxiosForEmpolis'

const PDP_DOCUMENT_LIMIT = 500

export const useEmpolisStore = defineStore('empolis', () => {
  const productDownloads = ref(new Map())

  const { axios } = useAxiosForEmpolis()
  const { i18n } = useContext()

  const getProductDownloads = async (orderNumber) => {
    if (!productDownloads.value.has(orderNumber)) {
      let results = []
      const files = await axios.$post('/search', {
        filter: {
          ProductID: [orderNumber],
        },
        limit: PDP_DOCUMENT_LIMIT,
        language: i18n.locale,
      })

      if (files && Array.isArray(files.results) && !files.error) {
        results = files.results
      } else {
        Logger.error(
          `Error when fetching product downloads '${orderNumber}'. Returning empty array.`,
          files.error
        )
      }
      productDownloads.value.set(orderNumber, results)
    }
    return productDownloads.value.get(orderNumber)
  }

  return {
    productDownloads,
    getProductDownloads,
  }
})
