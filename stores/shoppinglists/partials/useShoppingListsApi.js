import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useLogger } from '~/composables/useLogger'
import config from '~/config/hybris.config'

export const useShoppingListsApi = () => {
  const { axios } = useAxiosForHybris()
  const { logger } = useLogger('shoppingList')

  /**
   * Gets all current shopping lists
   * @return {Promise<Array>}
   */
  const getShoppingLists = async () => {
    const result = await axios.$get(`${config.SHOPPING_LISTS}`)

    if (
      typeof result === 'object' &&
      !result.error &&
      Array.isArray(result.shoppinglists)
    ) {
      return result?.shoppinglists
    }

    logger.error('Error when fetching shopping lists. Returning empty list.')
    return []
  }

  /**
   * Gets a shopping list by id
   * @param {*} id
   */
  const getShoppingList = async (id) => {
    const result = await axios.$get(`${config.SHOPPING_LISTS}/${id}`)

    if (typeof result === 'object' && !result.error) {
      return result
    }

    logger.error(
      'Error getting shopping list. Returning null.',
      result.error ? result.error : ''
    )
    return null
  }

  /**
   * Creates a new shopping list
   * @param {string} title
   * @param {string} description
   * @return Returns the ID of the new list
   */
  const createNewList = async (title, description) => {
    const result = await axios.$post(`${config.SHOPPING_LISTS}`, {
      name: title,
      description,
    })

    if (typeof result === 'object' && !result.error) {
      return result
    }

    logger.error(
      'Error when creating shopping list. Returning -1.',
      result.error ? result.error : ''
    )
    return -1
  }

  /**
   * Adds a product to a shopping list
   * @param listId
   * @param productCode
   * @param amount
   * @return {Promise<Object>}
   */
  const addToShoppingList = async (listId, productCode, amount = 1) => {
    const result = await axios.post(
      `${config.SHOPPING_LISTS}/${listId}/entries`,
      { amount, product: { code: productCode } }
    )

    if (result.status === 201) {
      return result
    }

    logger.error(
      'Error when adding to shopping list. Returning false.',
      result.error ? result.error : ''
    )
    return null
  }

  /**
   * Delete the specified shopping list
   * @param {*} id
   */
  const deleteShoppingList = async (id) => {
    const result = await axios.$delete(`${config.SHOPPING_LISTS}/${id}`)

    if (result.error) {
      logger.error(
        'Error when deleting shopping list.',
        result.error ? result.error : ''
      )
    }

    return null
  }

  /**
   * Updates the information for a shopping list
   * @param {*} id
   * @param {*} title
   * @param {*} description
   */
  const updateShoppingList = async (id, title, description) => {
    const result = await axios.$put(`${config.SHOPPING_LISTS}/${id}`, {
      name: title,
      description,
    })

    if (typeof result === 'object' && !result.error) {
      return true
    }

    logger.error(
      'Error when updating shopping list. Returning false.',
      result.error ? result.error : ''
    )
    return false
  }

  /**
   * Update quantity for entry
   * @param {*} listId
   * @param {*} code
   * @param {*} amount
   */
  const updateQuantity = async (listId, code, amount) => {
    const result = await axios.$put(
      `${config.SHOPPING_LISTS}/${listId}/entries/${code}`,
      { amount }
    )

    if (!result.error) {
      return true
    }

    logger.error(
      'Error when updating shopping list entry. Returning false.',
      result.error ? result.error : ''
    )
    return false
  }

  /**
   * Adds all entries of the shopping list to the cart
   * @param {*} listId
   * @param {*} code
   */
  const addListToCart = async (listId, code) => {
    const result = await axios.$post(
      `${config.SHOPPING_LISTS}/${listId}/add2cart/${code}`,
      null
    )

    if (!result.error) {
      return true
    }

    logger.error(
      'Error when adding shopping list to cart. Returning false.',
      result.error ? result.error : ''
    )
    return false
  }

  /**
   * Delete entry from shopping list
   * @param {*} listId
   * @param {*} code
   */
  const deleteEntry = async (listId, code) => {
    const result = await axios.$delete(
      `${config.SHOPPING_LISTS}/${listId}/entries/${code}`
    )

    if (typeof result === 'object' && !result.error) {
      return true
    }

    logger.error(
      'Error when deleting shopping list entry. Returning false.',
      result.error ? result.error : ''
    )
    return false
  }

  return {
    getShoppingLists,
    getShoppingList,
    createNewList,
    addToShoppingList,
    deleteShoppingList,
    updateShoppingList,
    updateQuantity,
    addListToCart,
    deleteEntry,
  }
}
