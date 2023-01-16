import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'

export const useMyAccountStore = defineStore('myaccount', () => {
  const menuItems = ref([])

  const hydrateMenuItems = (pageHeader) => {
    const links = pageHeader?.value?.[0]?.shopNavigationLinks
    if (links) {
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
