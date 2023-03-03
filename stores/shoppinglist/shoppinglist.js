import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

export const useShoppingList = defineStore('shoppinglist', () => {
  const shoppingLists = ref([])


  return {
    shoppingList,
  }
})
