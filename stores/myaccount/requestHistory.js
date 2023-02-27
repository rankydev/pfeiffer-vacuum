import { defineStore } from 'pinia'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'

export const useRequestHistoryStore = defineStore('requestHistory', () => {
  const { axios } = useAxiosForHybris()

  const loadCountries = async () => {
    const result = await axios.$get(config.ORDER_API, {}).catch((error) => {
      logger.error(
        'Error when fetching countries. Returning empty array.',
        error
      )
    })

    countries.value = result?.countries || []
  }

  const requestHistory = ref([])

  const loadRequestHistory = () => {}
  return {
    // States
    requestHistory,
    //Getters
    // Actions
    loadRequestHistory,
  }
})
