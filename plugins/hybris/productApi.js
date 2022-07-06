import config from './hybris.config'

export function getProductApi(axiosInstance) {
  return {
    async getProducts(ids) {
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

      if (Array.isArray(result.products)) {
        return result.products
      }

      console.error(
        `Array expected when fetching multiple products '${idsString}', returning empty array.`
      )
      return []
    },
  }
}
