import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

const defaultVsmUser = () => ({
  registered: false,
  userId: null,
  token: null,
})

export const useVsmStore = defineStore('vsm', () => {
  const vsmUser = ref(defaultVsmUser())

  const setVsmUser = (vsmUser) => {
    this.vsmUser = vsmUser || defaultVsmUser()
  }

  return { vsmUser, setVsmUser }
})
