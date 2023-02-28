import { defineStore, storeToRefs } from 'pinia'
import { ref, useContext } from '@nuxtjs/composition-api'
import { useAxiosForHybris } from '~/composables/useAxiosForHybris'
import { useMyAccountStore } from '~/stores/myaccount'
import config from '~/config/hybris.config'

export const useDashboardStore = defineStore('accountData', () => {
  const { axios } = useAxiosForHybris()
  const myAccountStore = useMyAccountStore()
  const { i18n, localePath } = useContext()
  const { orders } = storeToRefs(myAccountStore)
  const shoppingLists = ref()

  const getRecentRequestsTableData = async () => {
    if (!orders?.value?.length) {
      orders.value = await myAccountStore.getOrders()
    }

    return orders.value?.orders?.slice(0, 3).map((order) => {
      const orderUrl = `${localePath('shop-my-account-request-history')}/${
        order.code
      }`

      return {
        entries: [
          { icon: 'assignment', text: order.code, bold: true },
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

  const buildTableHeaderObject = (value) => {
    const object = {
      title: i18n.t(`myaccount.${value?.title || value}`),
    }
    if (typeof value === 'object' && value?.bold) {
      object.bold = value.bold
    }
    return object
  }

  const recentRequestHeader = [
    {
      title: 'requestNumber',
      sortable: false,
      bold: true,
    },
    'reference',
    'date',
    'total',
  ]
  const recentRequestsTableHeader = recentRequestHeader.map((value) => {
    return buildTableHeaderObject(value)
  })

  const getShoppingLists = async () => {
    try {
      const result = await axios.$get(config.SHOPPING_LISTS)
      if (
        typeof result === 'object' &&
        !result.error &&
        Array.isArray(result.shoppinglists)
      ) {
        shoppingLists.value = result.shoppingLists
        return result.shoppinglists
      }
    } catch (e) {
      Logger.error('Error when fetching shopping lists. Returning empty list.')
      return []
    }
  }

  const recentShoppingListHeader = [
    {
      title: 'shoppingList.title',
      bold: true,
    },
    'shoppingList.lastEdited',
    'shoppingList.items',
  ]

  const recentShoppingListTableHeader = recentShoppingListHeader.map((title) =>
    buildTableHeaderObject(title)
  )

  const getRecentShoppingListsTableData = async () => {
    if (!shoppingLists?.value?.length) {
      shoppingLists.value = await getShoppingLists()
    }

    return shoppingLists.value?.slice(0, 3).map((list) => {
      const shoppingListUrl = `${localePath(
        'shop-my-account-shopping-lists'
      )}/${list.id}`
      return {
        entries: [
          { icon: 'assignment', text: list.name, bold: true },
          i18n.d(new Date(list.lastModified), 'date'),
          `${list.entries?.length || 0} ${i18n.t(
            'myaccount.shoppingList.items'
          )}`,
        ],
        actions: [
          {
            label: i18n.t('myaccount.details'),
            icon: 'arrow_forward',
            variant: 'secondary',
            shape: 'plain',
            href: shoppingListUrl,
            mobile: false,
          },
          {
            icon: 'arrow_forward',
            variant: 'secondary',
            shape: 'outlined',
            label: i18n.t('myaccount.details'),
            href: shoppingListUrl,
            desktop: false,
          },
        ],
      }
    })
  }

  return {
    // States
    recentRequestsTableHeader,
    recentShoppingListTableHeader,
    recentShoppingListHeader,

    //Getters
    getRecentRequestsTableData,
    getRecentShoppingListsTableData,

    // getOrders,
    // Actions
  }
})
