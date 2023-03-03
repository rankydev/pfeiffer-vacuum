import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useLogger } from '~/composables/useLogger'
import config from '~/config/hybris.config'

export const useShoppingListsApi = () => {
  const { axios } = useAxiosForHybris()

  //const { logger } = useLogger('shoppingList')

  /**
   * Gets all current shopping lists
   * @return {Promise<Array>}
   */
  const getShoppingLists = async () => {
    const result = await axios.$get(config.SHOPPING_LISTS)

    if (
      typeof result === 'object' &&
      !result.error &&
      Array.isArray(result.shoppinglists)
    ) {
      return result.shoppinglists
    }

    Logger.error('Error when fetching shopping lists. Returning empty list.')
    return []
  }

  return {
    getShoppingLists,
  }
}
