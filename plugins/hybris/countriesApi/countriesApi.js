import config from '../hybris.config'

export function getCountriesApi(axiosInstance, ctx) {
  const logger = ctx.$getLoggerFor('countriesApi')
  return {
    async getCountries() {
      const result = await axiosInstance
        .$get(config.COUNTRIES_API, {})
        .catch((error) => {
          logger.error(
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
          logger.error(
            'Error when fetching regions. Returning empty array.',
            error || ''
          )
        })

      return result?.regions || []
    },
  }
}
