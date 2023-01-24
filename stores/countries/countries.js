import { defineStore } from 'pinia'
import {
  onServerPrefetch,
  onBeforeMount,
  ssrRef,
} from '@nuxtjs/composition-api'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'
import { joinURL } from 'ufo'
import { useLogger } from '~/composables/useLogger'
import { useLanguageSwitch } from '~/composables/useLanguageSwitch'

export const useCountriesStore = defineStore('countries', () => {
  const { axios } = useAxiosForHybris()
  const { logger } = useLogger('countriesStore')
  const { onLanguageSwitched } = useLanguageSwitch()

  const countries = ssrRef([])
  const regions = ssrRef({})

  const getCountryName = (code) => {
    if (countries?.length) {
      const country = countries.find((o) => o.isocode === code)
      if (country) {
        return country.name
      }
    }
    return ''
  }

  const loadCountries = async () => {
    const result = await axios.$get(config.COUNTRIES_API, {}).catch((error) => {
      logger.error(
        'Error when fetching countries. Returning empty array.',
        error
      )
    })

    countries.value = result?.countries || []
  }

  const loadRegions = async (isocode) => {
    if (!isocode) {
      logger.info("Can't load regions without isocode")
      return
    }

    if (regions.value[isocode]?.length > 0) {
      logger.debug(
        `Regions for isocode ${isocode} are already loaded, no need to load again`,
        regions.value[isocode]
      )
      return
    }

    const result = await axios
      .$get(joinURL(`${config.COUNTRIES_API}/${isocode}/regions`))
      .catch((error) => {
        logger.error(
          'Error when fetching regions. Returning empty array.',
          error
        )
      })

    regions.value[isocode] = result?.regions || []
  }

  // the initial store initialization
  /* istanbul ignore else  */
  if (countries.value.length === 0) {
    onBeforeMount(loadCountries)
    onServerPrefetch(loadCountries)
  }

  /* istanbul ignore next  */
  onLanguageSwitched(loadCountries)

  return { countries, regions, loadRegions, getCountryName }
})
