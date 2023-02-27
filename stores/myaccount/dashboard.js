import { defineStore, storeToRefs } from 'pinia'
import { useContext } from '@nuxtjs/composition-api'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useMyAccountStore } from '~/stores/myaccount'

export const useDashboardStore = defineStore('accountData', () => {
  const { axios } = useAxiosForHybris()
  const myAccountStore = useMyAccountStore()
  const { i18n, localePath } = useContext()
  const { orders } = storeToRefs(myAccountStore)

  const getRecentRequestsTableData = async () => {
    if (!orders?.value?.length) {
      orders.value = await myAccountStore.getOrders()
    }

    return orders.value?.orders?.slice(2).map((order) => {
      const orderUrl = `${localePath('shop-my-account-request-history')}/${
        order.code
      }`

      return {
        entries: [
          order.code,
          order.customerReference || '-',
          i18n.d(new Date(order.placed), 'date'),
          order.total?.formattedValue,
        ],
        actions: [
          {
            label: i18n.t('myaccount.details'),
            icon: 'arrow_forward',
            variant: 'secondary',
            shape: 'plain',
            href: orderUrl,
            mobile: false,
          },
          {
            icon: 'arrow_forward',
            variant: 'secondary',
            shape: 'outlined',
            href: orderUrl,
            label: i18n.t('myaccount.details'),
            desktop: false,
          },
        ],
      }
    })
  }

  const buildTableHeaderObject = (title) => {
    return {
      title: i18n.t(`myaccount.${title}`),
    }
  }

  const recentRequestHeader = ['requestNumber', 'reference', 'date', 'total']
  const recentRequestsTableHeader = recentRequestHeader.map((title) =>
    buildTableHeaderObject(title)
  )

  return {
    // States
    recentRequestsTableHeader,

    //Getters
    getRecentRequestsTableData,

    // getOrders,
    // Actions
  }
})
