import { defineStore } from 'pinia'
import { onMounted, ref, watch } from '@nuxtjs/composition-api'
import { useShoppingListsApi } from './partials/useShoppingListsApi'
import { useUserStore } from '@/stores/user'

export const useShoppingLists = defineStore('shoppinglist', () => {
  const shoppingListsApi = useShoppingListsApi()
  const currentShoppingLists = ref([])
  const { getShoppingLists } = shoppingListsApi
  const userStore = useUserStore()

  const initialShoppingListsLoad = async () => {
    const shoppingLists = await getShoppingLists()
    if (shoppingLists.length > 0) {
      currentShoppingLists.value = shoppingLists
    }
  }

  watch(userStore, (newValue) => {
    if (newValue.isLoggedIn) {
      initialShoppingListsLoad()
    }
  })

  onMounted(initialShoppingListsLoad)

  return {
    currentShoppingLists,
  }
})
