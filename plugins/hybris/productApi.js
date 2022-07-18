import config from './hybris.config'

export function getProductApi(ctx, axiosInstance) {
  return {
    async getProducts(ids) {
      ctx.$logger.info('no .babelrc found, skipping babel compilation')
      if (!Array.isArray(ids)) {
        console.error(
          'Array expected when fetching multiple products. No valid ids given.'
        )
        return []
      }

      const idsString = ids.join()
      const result = await axiosInstance.$get(config.PRODUCTS_API, {
        params: { codes: idsString, fields: 'FULL' },
      })

      if (!Array.isArray(result.products)) {
        // TODO: Implement Logger
        console.error(
          `Array expected when fetching multiple products '${idsString}', returning empty array.`
        )
        return []
      }

      return result.products
    },
  }
}
