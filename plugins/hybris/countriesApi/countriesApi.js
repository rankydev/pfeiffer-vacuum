import config from '../hybris.config'

export function getCountriesApi(axiosInstance, ctx) {
  return {
    async getCountries() {
      const result = await axiosInstance.$get(config.COUNTRIES_API, {})

      if (!result.error && Array.isArray(result.countries)) {
        return result.countries
      }

      ctx.$logger.error(
        'Error when fetching countries. Returning empty array.',
        result.error || ''
      )
      return []
    },

    async getRegions(iso) {
      const result = await axiosInstance.$get(
        `${config.COUNTRIES_API}/${iso}/regions`
      )

      if (!result.error && Array.isArray(result.regions)) {
        return result.regions
      }
      ctx.$logger.error(
        'Error when fetching regions. Returning empty array.',
        result.error || ''
      )

      return []
    },
  }
}
