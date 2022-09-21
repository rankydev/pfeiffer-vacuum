import config from '../hybris.config'

export function getProductApi(axiosInstance, ctx) {
  const logger = ctx.$getLoggerFor('productApi')
  return {
    async getProducts(ids) {
      if (!Array.isArray(ids)) {
        logger.error(
          'Array expected when fetching multiple products. No valid ids given.'
        )
        return []
      }

      const idsString = ids.join()
      const result = await axiosInstance
        .$get(config.PRODUCTS_API, {
          params: { codes: idsString, fields: 'FULL' },
        })
        .catch((error) => {
          logger.error(error.toJSON())
        })

      if (!Array.isArray(result.products)) {
        logger.error(
          `Array expected when fetching multiple products '${idsString}', returning empty array.`
        )
        return []
      }

      return result.products
    },
  }
}
