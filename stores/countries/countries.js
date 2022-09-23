import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { joinURL } from 'ufo'
import { useLogger } from '~/composables/useLogger'

export const useCountriesStore = defineStore('countries', () => {
  const { axios } = useAxiosForHybris()
  const { logger } = useLogger()

  const countries = ref([])
  const regions = ref({})

  const loadCountries = async () => {
    const result = await axios.$get(config.COUNTRIES_API, {}).catch((error) => {
      logger.error(
        'Error when fetching countries. Returning empty array.',
        error || ''
      )
    })

    countries.value = result?.countries || []
  }

  const loadRegions = async (isocode) => {
    if (!isocode) return []

    const result = await axios
      .$get(joinURL(`${config.COUNTRIES_API}/${isocode}/regions`))
      .catch((error) => {
        logger.error(
          'Error when fetching regions. Returning empty array.',
          error || ''
        )
      })

    regions.value[isocode] = result?.regions || []
  }

  // the initial store initialization
  if (countries.value?.length === 0) {
    loadCountries()
  }

  return { countries, regions, loadRegions }
})
