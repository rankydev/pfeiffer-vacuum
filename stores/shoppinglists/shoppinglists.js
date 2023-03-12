import { defineStore, storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from '@nuxtjs/composition-api'
import { useShoppingListsApi } from './partials/useShoppingListsApi'
import { useUserStore } from '~/stores/user'
import { useProductStore } from '~/stores/product'
import { useToast } from '~/composables/useToast'
import { useContext } from '@nuxtjs/composition-api'

export const useShoppingLists = defineStore('shoppinglists', () => {
  const shoppingListsApi = useShoppingListsApi()
  const toast = useToast()
  const { i18n } = useContext()

  const currentShoppingLists = ref([])
  const overlayState = ref(false)
  const stateMode = ref('basic')

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
      const result = await shoppingListsApi.addToShoppingList(
        listId,
        productCode,
        amount
      )
      if (result) {
        toast.success(
          {
            description: i18n.t('myaccount.shoppingList.addSuccessful', {
              listName: result?.data?.name,
            }),
          },
          { timeout: 3000 }
        )
        await initialShoppingListsLoad()
      }
    }
    setProductAmount(1)
  }

  const createNewListAndAddProduct = async (name, description) => {
    const shoppingList = await shoppingListsApi.createNewList(name, description)
    if (shoppingList !== -1) {
      await addToShoppingList(shoppingList.id)
    } else {
      toast.error(
        {
          description: i18n.t('myaccount.shoppingList.addError'),
        },
        { timeout: 3000 }
      )
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

  const addMode = () => {
    stateMode.value = 'add'
  }

  const basicMode = () => {
    stateMode.value = 'basic'
  }

  const newListMode = () => {
    stateMode.value = 'newList'
  }

  const isAddMode = computed(() => {
    return stateMode.value === 'add'
  })

  const isNewListMode = computed(() => {
    return stateMode.value === 'newList'
  })

  const isBasicMode = computed(() => {
    return stateMode.value === 'basic'
  })

  const deleteShoppingList = async (listId) => {
    await shoppingListsApi.deleteShoppingList(listId)
    currentShoppingLists.value = currentShoppingLists.value.filter(
      (list) => list.id !== listId
    )
  }

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
    deleteShoppingList,
    addMode,
    basicMode,
    newListMode,
    isAddMode,
    isNewListMode,
    isBasicMode,
  }
})
