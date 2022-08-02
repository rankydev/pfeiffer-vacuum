import config from '../hybris.config'

export function getProductApi(axiosInstance, ctx) {
  return {
    async getProducts(ids) {
      if (!Array.isArray(ids)) {
        ctx.$logger.error(
          'Array expected when fetching multiple products. No valid ids given.'
        )
        return []
      }

      const idsString = ids.join()
      const result = axiosInstance
        .$get(config.PRODUCTS_API, {
          params: { codes: idsString, fields: 'FULL' },
        })
        .catch((error) => {
          ctx.$logger.error(error.toJSON())
        })

      if (!Array.isArray(result.products)) {
        ctx.$logger.error(
          `Array expected when fetching multiple products '${idsString}', returning empty array.`
        )
        return []
      }

      return result.products
    },
  }
}
