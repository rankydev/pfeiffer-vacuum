import { defineStore } from 'pinia'
import { useContext } from '@nuxtjs/composition-api'
import { useAxiosForDatasources } from '~/composables/useAxiosForDatasources'

export const useDatasourcesStore = defineStore('datasources', () => {
  const { axios } = useAxiosForDatasources()
  const { i18n } = useContext()

  const loadLinksFromDatasource = async () => {
    const lang = i18n.locale || ''
    const result = await axios
      .$get('/datasource_entries', {
        params: {
          token: process.env.STORYBLOK_ACCESS_TOKEN,
          dimension: lang,
          datasource: 'files',
          cv: 0, // For cache invalidation
        },
      })
      .catch((error) => {
        console.error('Error when fetching datasources.', error)
      })
    const personalPrivacyLink =
      result.datasource_entries.find(
        (e) => e.name === 'personal data privacy'
      ) || {}

    return {
      personalPrivacyLink:
        personalPrivacyLink.dimension_value || personalPrivacyLink.value || '',
    }
  }

  return {
    loadLinksFromDatasource,
  }
})
