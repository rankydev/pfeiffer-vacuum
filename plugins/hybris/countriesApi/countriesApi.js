import config from '../hybris.config'

export function getCountriesApi(axiosInstance, ctx) {
  return {
    async getCountries() {
      const result = await axiosInstance
        .$get(config.COUNTRIES_API, {})
        .catch((error) => {
          ctx.$logger.error(
            'Error when fetching countries. Returning empty array.',
            error || ''
          )
        })
      return result?.countries || []
    },

    async getRegions(iso) {
      const result = await axiosInstance
        .$get(`${config.COUNTRIES_API}/${iso}/regions`)
        .catch((error) => {
          ctx.$logger.error(
            'Error when fetching regions. Returning empty array.',
            error || ''
          )
        })

      return result?.regions || []
    },
  }
}
