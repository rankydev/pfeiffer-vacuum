import { defineStore } from 'pinia'
import { useContext, ssrRef, computed } from '@nuxtjs/composition-api'
import { useAxiosForDatasources } from '~/composables/useAxiosForDatasources'
import { getProxyStoryBlokAssetLink } from '~/utils/storyblok'

export const useDatasourcesStore = defineStore('datasources', () => {
  const { axios } = useAxiosForDatasources()
  const { i18n } = useContext()

  let files = ssrRef({})

  const personalPrivacyLink = computed(() => {
    return files.value['personalPrivacyLink'] || ''
  })

  const loadLinksFromDatasource = async () => {
    const lang = i18n.locale || ''
    await axios
      .$get('/datasource_entries', {
        params: {
          dimension: lang,
          datasource: 'files',
          cv: 0, // For cache invalidation
        },
      })
      .then((result) => {
        const link =
          result?.datasource_entries.find(
            (e) => e.name === 'personal data privacy'
          ) || {}
        files.value = {
          personalPrivacyLink: getProxyStoryBlokAssetLink(
            link.dimension_value || link.value || ''
          ),
        }
      })
      .catch((error) => {
        console.error('Error when fetching datasources.', error)
      })
  }

  return {
    loadLinksFromDatasource,
    personalPrivacyLink,
    files,
  }
})
