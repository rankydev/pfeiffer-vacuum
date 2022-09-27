import { defineStore } from 'pinia'
import { useLogger } from '~/composables/useLogger'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'

export const useProductStore = defineStore('product', () => {
  const { logger } = useLogger('productStore')
  const { axios } = useAxiosForHybris()

  const getProducts = async (ids) => {
    if (!Array.isArray(ids)) {
      logger.error(
        'Array expected when fetching multiple products. No valid ids given.'
      )
      return []
    }

    const idsString = ids.join()
    const result = await axios
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
  }

  return {
    getProducts,
  }
})
