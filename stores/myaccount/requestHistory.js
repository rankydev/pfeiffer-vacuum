import { defineStore, ref } from 'pinia'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'

export const useRequestHistoryStore = defineStore('requestHistory', () => {
  const { axios } = useAxiosForHybris()

  const loadRequestHistory = async (page, size = 5) => {
    try {
      const result = await axios.$get(config.ORDER_API, {
        params: {
          fields: 'FULL',
          pageSize: size,
          currentPage: page - 1 || 0,
        },
      })

      if (result && Array.isArray(result.orders) && !result.error) {
        return result
      }
    } catch (e) {
      logger.error(
        'Error when getting orders. Returning empty array.',
        e ? e : ''
      )
      return []
    }
  }

  const requestHistory = ref([])

  return {
    // States
    requestHistory,
    //Getters
    // Actions
    loadRequestHistory,
  }
})
