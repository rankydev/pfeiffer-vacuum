import { defineStore } from 'pinia'
import { useContext } from '@nuxtjs/composition-api'
import { useAxiosForDatasources } from '@/composables/useAxiosForDatasources'

export const useDatasourcesStore = defineStore('datasources', () => {
  const { axios } = useAxiosForDatasources()
  const { i18n } = useContext()

  const loadFilesFromDatasource = async () => {
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
    const privacyGeneral =
      result.datasource_entries.find(
        (e) => e.name === 'general data privacy'
      ) || {}
    const privacyPersonal =
      result.datasource_entries.find(
        (e) => e.name === 'personal data privacy'
      ) || {}
    const imprint =
      result.datasource_entries.find((e) => e.name === 'imprint') || {}

    return {
      privacyGeneral:
        privacyGeneral.dimension_value || privacyGeneral.value || '',
      privacyPersonal:
        privacyPersonal.dimension_value || privacyPersonal.value || '',
      imprint: imprint.dimension_value || imprint.value || '',
    }
  }

  return {
    loadFilesFromDatasource,
  }
})
