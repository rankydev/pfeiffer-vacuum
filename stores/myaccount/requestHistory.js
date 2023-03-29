import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'
import config from '~/config/hybris.config'
import { useLogger } from '~/composables/useLogger'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'

export const useRequestHistoryStore = defineStore('requestHistory', () => {
  const { axios } = useAxiosForHybris()
  const { logger } = useLogger('requestHistoryStore')

  const requestHistory = ref([])
  const currentOrder = ref({})

  const isLoadingContent = ref(false)

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
      } else {
        throw result.error || 'unknown error'
      }
    } catch (e) {
      logger.error(
        'Error when getting orders. Returning empty array.',
        e ? e : ''
      )
      return []
    }
  }

  const loadOrderContent = async (orderGuid) => {
    isLoadingContent.value = true

    await axios
      .$get(config.ORDER_API + '/' + orderGuid, {
        params: {
          fields: 'FULL',
        },
      })
      .then((val) => {
        currentOrder.value = val
      })
      .catch((e) => {
        logger.error(
          'Error when getting content of order. Returning empty array.',
          e ? e : ''
        )
        currentOrder.value = {}
      })
      .finally(() => {
        isLoadingContent.value = false
      })
  }

  return {
    // States
    requestHistory,
    currentOrder,

    // Getters
    isLoadingContent,

    // Actions
    loadRequestHistory,
    loadOrderContent,
  }
})
