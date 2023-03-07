import { defineStore } from 'pinia'
import { useLogger } from '~/composables/useLogger'
import config from '~/config/hybris.config'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { ref } from '@nuxtjs/composition-api'
import { joinURL } from 'ufo'
export const useKnowledgeStore = defineStore('knowledge', () => {
  const { logger } = useLogger('knowledgeStore')
  const { axios } = useAxiosForHybris()

  const searchResults = ref([])

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

  const knowledgeSearch = async (type) => {
    const path = `${config.KNOWLEDGE_API}/search`
    await axios
      .$get(path, { type: type || null })
      .then((res) => {
        searchResults.value = res
      })
      .catch((error) => {
        logger.error(
          'Error when fetching knowledge entries. Returning empty array.',
          error
        )
        searchResults.value = []
      })
  }

  const getHybrisDetails = async (type = 'whitepaper', id) => {
    const path = joinURL(config.KNOWLEDGE_API, type, id)
    return await axios.$get(path)
  }

  return {
    searchResults,

    registerForWebinar,
    getHybrisDetails,
    knowledgeSearch,
  }
})
