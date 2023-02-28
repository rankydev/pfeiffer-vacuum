<template>
  <div>
    <MyAccountHeading />
    <div>
      <GenericTable :header="header" :table-data="tableData" />
      <Pagination :total-pages="totalPages" />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  onServerPrefetch,
  useContext,
  computed,
  watch,
  useRoute,
} from '@nuxtjs/composition-api'
import MyAccountHeading from '~/components/organisms/MyAccount/partials/MyAccountHeading'
import GenericTable from '~/components/molecules/GenericTable/GenericTable'
import Pagination from '~/components/molecules/Pagination/Pagination'
import { useRequestHistoryStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'RequestHistory',
  components: {
    MyAccountHeading,
    GenericTable,
    Pagination,
  },
  setup() {
    const { i18n, app } = useContext()
    const route = useRoute()

    const requestHistoryStore = useRequestHistoryStore()
    const { loadRequestHistory } = requestHistoryStore

    const { requestHistory } = storeToRefs(requestHistoryStore)
    onBeforeMount(loadRequestHistory)
    onServerPrefetch(loadRequestHistory)

    const header = computed(() => [
      {
        title: i18n.t('myaccount.requestHistory.table.requestNumber'),
      },
      { title: i18n.t('myaccount.requestHistory.table.requestReference') },
      { title: i18n.t('myaccount.requestHistory.table.date') },
      { title: i18n.t('myaccount.requestHistory.table.requestTotal') },
    ])

    const totalPages = computed(() => {
      return requestHistory?.value?.pagination?.totalPages
    })

    const tableData = computed(() => {
      const result = []

      if (requestHistory.value.orders) {
        console.log(requestHistory.value.sorts, 'SALAMI')
        for (const request of requestHistory.value.orders) {
          const entries = []

          entries.push({
            text: request.code,
            icon: 'description',
          })
          entries.push({
            text: request.customerReference || '-',
          })
          entries.push({
            text: i18n.d(new Date(request.placed), 'date'),
          })
          entries.push({
            text: request.total.formattedValue,
          })

          const actions = [
            {
              desktop: true,
              mobile: true,
              label: i18n.t('cart.details'),
              icon: 'arrow_forward',
              variant: 'secondary',
              shape: 'outlined',
              href: `${
                app.localePath('shop-my-account-request-history') +
                '/' +
                request.code
              }`,
              target: '_blank',
            },
          ]

          result.push({
            entries,
            actions,
          })
        }
      }

      return result
    })

    watch(route, (val1, val2) => {
      loadRequestHistory(val1.query.currentPage || 1)
    })

    return { requestHistory, header, tableData, totalPages }
  },
})
</script>
