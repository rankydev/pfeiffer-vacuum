import { defineStore } from 'pinia'
import { useContext, ssrRef } from '@nuxtjs/composition-api'
import { useAxiosForDatasources } from '~/composables/useAxiosForDatasources'

export const useDatasourcesStore = defineStore('datasources', () => {
  const { axios } = useAxiosForDatasources()
  const { i18n } = useContext()

  let files = ssrRef({})

  const loadLinksFromDatasource = async () => {
    const lang = i18n.locale || ''
    await axios
      .$get('/datasource_entries', {
        params: {
          token: process.env.STORYBLOK_ACCESS_TOKEN,
          dimension: lang,
          datasource: 'files',
          cv: 0, // For cache invalidation
        },
      })
      .then((result) => {
        const personalPrivacyLink =
          result?.datasource_entries.find(
            (e) => e.name === 'personal data privacy'
          ) || {}
        files.value = {
          personalPrivacyLink:
            personalPrivacyLink.dimension_value ||
            personalPrivacyLink.value ||
            '',
        }
      })
      .catch((error) => {
        console.error('Error when fetching datasources.', error)
      })
  }

  return {
    loadLinksFromDatasource,
    files,
  }
})
