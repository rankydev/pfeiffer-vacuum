import { defineStore } from 'pinia'
import { useLogger } from '~/composables/useLogger'
import config from '~/config/hybris.config'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useRoute, ref, computed } from '@nuxtjs/composition-api'
import { joinURL } from 'ufo'
export const useKnowledgeStore = defineStore('knowledge', () => {
  const { logger } = useLogger('knowledgeStore')
  const { axios } = useAxiosForHybris()
  const route = useRoute()

  const isLoading = ref(false)
  const searchResults = ref([])

  /**
   * Page type check
   */
  const isOverviewPage = computed(
    () => !isWhitepapers.value && !isWebinars.value
  )
  const isWhitepapers = computed(() => route.value.path.includes('whitepapers'))
  const isWebinars = computed(() => route.value.path.includes('webinars'))

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

  const knowledgeType = computed(() => {
    if (isWhitepapers.value) return 'WHITEPAPER'
    if (isWebinars.value) return 'WEBINAR'
    return 'ALL'
  })

  const knowledgeSearch = async () => {
    isLoading.value = true

    const searchTerm = route.value.query.searchTerm || null
    const currentPage = route.value.query.currentPage - 1 || 0
    const pageSize = route.value.query.pageSize || 12
    const path = `${config.KNOWLEDGE_API}/search`

    await axios
      .$get(path, {
        params: {
          type: knowledgeType.value,
          currentPage,
          pageSize,
          searchTerm,
        },
      })
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
      .finally(() => {
        isLoading.value = false
      })
  }

  const getHybrisDetails = async (type = 'whitepaper', id) => {
    const path = joinURL(config.KNOWLEDGE_API, type, id)
    return await axios.$get(path)
  }

  return {
    searchResults,
    isLoading,
    isOverviewPage,
    isWhitepapers,
    isWebinars,

    registerForWebinar,
    getHybrisDetails,
    knowledgeSearch,
  }
})
