import { defineStore } from 'pinia'
import { useLogger } from '~/composables/useLogger'
import config from '~/config/hybris.config'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'

export const useKnowledgeStore = defineStore('knowledge', () => {
  const { logger } = useLogger('knowledgeStore')
  const { axios } = useAxiosForHybris()

  const registerForWebinar = async (id) => {
    const path = `${config.KNOWLEDGE_API}/webinar/${id}/register`
    const result = await axios.$post(path, {})

    if (![409, 200, 201].includes(result.status || 500)) {
      const error = new Error('GoToWebinar registration failed')
      logger.error(error, result)
      throw error
    }
    return true
  }

  return {
    registerForWebinar,
  }
})
