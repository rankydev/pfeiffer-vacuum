import { defineStore } from 'pinia'
import { useLogger } from '~/composables/useLogger'
import config from '~/config/hybris.config'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useRoute, ref, computed, useContext } from '@nuxtjs/composition-api'
import { joinURL } from 'ufo'
import { useToast } from '~/composables/useToast'

export const useKnowledgeStore = defineStore('knowledge', () => {
  const { logger } = useLogger('knowledgeStore')
  const { axios } = useAxiosForHybris()
  const { localePath, i18n } = useContext()
  const route = useRoute()
  const toast = useToast()

  const isLoading = ref(false)
  const isModalOpen = ref(false)
  const searchResults = ref({})

  /**
   * Page type check
   */
  const isOverviewPage = computed(
    () => !isWhitepapers.value && !isWebinars.value
  )
  const isWhitepapers = computed(() => route.value.path.includes('whitepapers'))
  const isWebinars = computed(() => route.value.path.includes('webinars'))

  const searchPlaceholder = computed(() => {
    if (isWhitepapers.value) return i18n.t('knowledge.searchWhitepapers')
    if (isWebinars.value) return i18n.t('knowledge.searchWebinars')
    return i18n.t('knowledge.search')
  })

  /**
   * Headline parameters
   */
  const resultHeadline = computed(() => {
    if (isWhitepapers.value) return i18n.t('knowledge.whitepapers')
    if (isWebinars.value) return i18n.t('knowledge.webinars')
    return i18n.t('knowledge.allRessources')
  })
  const backLink = computed(() =>
    !isOverviewPage.value ? localePath('knowledge') : null
  )

  const knowledgeType = computed(() => {
    if (isWhitepapers.value) return 'WHITEPAPER'
    if (isWebinars.value) return 'WEBINAR'
    return 'ALL'
  })

  const filterEntries = computed(
    () => searchResults.value?.filter?.filter((e) => e.code !== 'type') || []
  )

  const registerForWebinar = async (id) => {
    isLoading.value = true
    const path = `${config.KNOWLEDGE_API}/webinar/${id}/register`

    await axios
      .$post(path, {})
      .then(() => {
        toast.success(
          {
            description: i18n.t('knowledge.webinar.registration.success'),
          },
          {
            timeout: 8000,
          }
        )
      })
      .catch((e) => {
        const error = new Error('GoToWebinar registration failed')
        logger.error(error, e)

        if (e.data?.errors?.[0]?.type === 'AlreadyExistsError') {
          toast.warning(
            {
              description: i18n.t(
                'knowledge.webinar.registration.alreadyExists'
              ),
            },
            {
              timeout: 8000,
            }
          )
        } else {
          toast.error(
            {
              description: i18n.t('knowledge.webinar.registration.error'),
            },
            {
              timeout: 8000,
            }
          )
        }
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const knowledgeSearch = async () => {
    isLoading.value = true

    const searchTerm = route.value.query.searchTerm || undefined
    const currentPage = route.value.query.currentPage - 1 || 0
    const pageSize = route.value.query.pageSize || 12
    const path = `${config.KNOWLEDGE_API}/search`

    await axios
      .$get(path, {
        params: {
          ...route.value.query,
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
        searchResults.value = {}
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
    resultHeadline,
    backLink,
    filterEntries,
    isModalOpen,
    searchPlaceholder,

    registerForWebinar,
    getHybrisDetails,
    knowledgeSearch,
  }
})
