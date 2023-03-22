import { defineStore } from 'pinia'
import { ref } from '@nuxtjs/composition-api'
import { useLogger } from '~/composables/useLogger'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import config from '~/config/hybris.config'

export * from './accountData'
export * from './requestHistory'
export * from './dashboard'

export const useMyAccountStore = defineStore('myaccount', () => {
  const { logger } = useLogger('myAccountStore')
  const { axios } = useAxiosForHybris()
  const menuItems = ref([])
  const orders = ref([])

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

  const getOrders = async (page, size = 5) => {
    try {
      const result = await axios.$get(config.ORDER_API, {
        params: {
          fields: 'FULL',
          pageSize: size,
          currentPage: page - 1 || 0,
        },
      })

      if (result && Array.isArray(result.orders) && !result.error) {
        orders.value = result
        return result
      } else {
        throw result?.error
      }
    } catch (e) {
      logger.error(
        'Error when getting orders. Returning empty array.',
        e ? e : ''
      )
      return []
    }
  }

  return {
    // States
    menuItems,
    orders,

    //Getters
    getOrders,

    // Actions
    hydrateMenuItems,
  }
})
