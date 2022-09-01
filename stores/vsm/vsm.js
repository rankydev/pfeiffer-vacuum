import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

const defaultVsmUser = () => ({
  registered: false,
  userId: null,
  token: null,
})

export const useVsmStore = defineStore('vsm', () => {
  const vsmUser = ref(defaultVsmUser())

  const setVsmUser = (newVsmUser) => {
    vsmUser.value = newVsmUser || defaultVsmUser()
  }

  const resetVsmUser = () => {
    setVsmUser(defaultVsmUser())
  }

  return { vsmUser, setVsmUser, resetVsmUser }
})
