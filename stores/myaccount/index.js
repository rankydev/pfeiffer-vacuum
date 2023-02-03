import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'
export * from './accountData'

export const useMyAccountStore = defineStore('myaccount', () => {
  const menuItems = ref([])

  const hydrateMenuItems = (links) => {
    if (links?.length) {
      menuItems.value = links.map((item) => {
        return {
          label: item.label,
          href: item.href,
          icon: item.icon,
        }
      })
    }
  }

  return {
    menuItems,
    hydrateMenuItems,
  }
})
