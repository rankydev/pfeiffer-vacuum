import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'

/**
 * Gets all current shopping lists
 * @return {Promise<Array>}
 */
export async function getShoppingLists() {
  const { axios } = useAxiosForHybris()
  const req = axios.$get(config.SHOPPING_LISTS)
  return { req }
}
