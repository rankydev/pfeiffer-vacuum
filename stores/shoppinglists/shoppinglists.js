import { defineStore, storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from '@nuxtjs/composition-api'
import { useShoppingListsApi } from './partials/useShoppingListsApi'
import { useUserStore } from '~/stores/user'
import { useProductStore } from '~/stores/product'

export const useShoppingLists = defineStore('shoppinglists', () => {
  const shoppingListsApi = useShoppingListsApi()
  const currentShoppingLists = ref([])
  const overlayState = ref(false)
  const userStore = useUserStore()
  const { isLoggedIn } = storeToRefs(userStore)
  const productStore = useProductStore()
  const { product } = storeToRefs(productStore)
  const productAmount = ref(1)

  const setProductAmount = (amount) => {
    productAmount.value = amount
  }

  const setProduct = (productVar) => {
    product.value = productVar
  }

  const productId = computed(() => {
    return product.value?.code || -1
  })

  const initialShoppingListsLoad = async () => {
    if (!isLoggedIn.value) {
      return
    }
    const shoppingLists = await shoppingListsApi.getShoppingLists()
    if (shoppingLists && shoppingLists.length > 0) {
      currentShoppingLists.value = shoppingLists
    }
  }

  const createNewList = async (name, description) => {
    const shoppingList = await shoppingListsApi.createNewList(name, description)
    if (shoppingList !== -1) {
      currentShoppingLists.value.push(shoppingList)
    }
  }

  const addToShoppingList = async (
    listId,
    productCode = productId.value,
    amount = productAmount.value
  ) => {
    if (productCode !== -1) {
      await shoppingListsApi.addToShoppingList(listId, productCode, amount)
    }
    setProductAmount(1)
  }

  const createNewListAndAddProduct = async (name, description) => {
    const shoppingList = await shoppingListsApi.createNewList(name, description)
    if (shoppingList !== -1) {
      currentShoppingLists.value.push(shoppingList)
      await addToShoppingList(shoppingList.id)
    }
  }

  const shoppingLists = computed(() => {
    return currentShoppingLists.value
  })

  const toggleOverlay = () => {
    overlayState.value = !overlayState.value
  }

  const isOverlayOpen = computed(() => {
    return overlayState.value
  })

  watch(isLoggedIn, async () => {
    await initialShoppingListsLoad()
  })

  onMounted(async () => {
    await initialShoppingListsLoad()
  })

  return {
    shoppingLists,
    createNewList,
    initialShoppingListsLoad,
    toggleOverlay,
    isOverlayOpen,
    addToShoppingList,
    setProductAmount,
    createNewListAndAddProduct,
    setProduct,
  }
})
