import { defineStore, storeToRefs } from 'pinia'
import {
  onBeforeMount,
  onServerPrefetch,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import { useShoppingListsApi } from './partials/useShoppingListsApi'
import { useUserStore } from '@/stores/user'

export const useShoppingLists = defineStore('shoppinglist', () => {
  const shoppingListsApi = useShoppingListsApi()
  const currentShoppingLists = ref([])
  const { getShoppingLists } = shoppingListsApi
  const { isLoggedIn } = storeToRefs(useUserStore())

  console.log('isLoggedIn', isLoggedIn)

  const initialShoppingListsLoad = async () => {
    if (!isLoggedIn.value) return []
    currentShoppingLists.value = await getShoppingLists()[0]?.entries
    console.log('currentShoppingLists.value', currentShoppingLists.value)
  }

  onBeforeMount(initialShoppingListsLoad())
  onServerPrefetch(initialShoppingListsLoad())

  watch(isLoggedIn, async (newVal) => {
    console.log('isLoggedIn changed', newVal)
    await initialShoppingListsLoad()
  })

  return {
    currentShoppingLists,
  }
})
