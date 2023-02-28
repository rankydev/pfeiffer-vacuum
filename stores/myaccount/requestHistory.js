import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'
import config from '~/config/hybris.config'
import { useLogger } from '~/composables/useLogger'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'

export const useRequestHistoryStore = defineStore('requestHistory', () => {
  const { axios } = useAxiosForHybris()
  const { logger } = useLogger('requestHistoryStore')

  const requestHistory = ref([])

  const loadRequestHistory = async (page, size = 5, sortCode) => {
    try {
      const result = await axios.$get(config.ORDER_API, {
        params: {
          fields: 'FULL',
          pageSize: size,
          currentPage: page - 1 || 0,
          sort: sortCode,
        },
      })

      if (result && Array.isArray(result.orders) && !result.error) {
        requestHistory.value = result
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

  return {
    // States
    requestHistory,
    //Getters
    // Actions
    loadRequestHistory,
  }
})
