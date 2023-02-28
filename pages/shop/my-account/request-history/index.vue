<template>
  <div>
    <MyAccountHeading />
    <div>
      <GenericTable :header="header" :table-data="tableData" />
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
} from '@nuxtjs/composition-api'
import MyAccountHeading from '~/components/organisms/MyAccount/partials/MyAccountHeading'
// import TableView from '~/components/molecules/GenericTable/partials/TableView'
import GenericTable from '~/components/molecules/GenericTable/GenericTable'
import { useRequestHistoryStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'RequestHistory',
  components: {
    MyAccountHeading,
    GenericTable,
    // TableView,
  },
  setup() {
    const { i18n } = useContext()

    const requestHistoryStore = useRequestHistoryStore()
    const { loadRequestHistory } = requestHistoryStore

    const { requestHistory } = storeToRefs(requestHistoryStore)
    onBeforeMount(loadRequestHistory)
    onServerPrefetch(loadRequestHistory)

    const header = computed(() => [
      { title: i18n.t('myaccount.requestHistory.table.requestNumber') },
      { title: i18n.t('myaccount.requestHistory.table.requestReference') },
      { title: i18n.t('myaccount.requestHistory.table.date') },
      { title: i18n.t('myaccount.requestHistory.table.requestTotal') },
    ])

    const tableData = computed(() => {
      const result = []

      console.log(requestHistory.value.orders)
      if (requestHistory.value.orders) {
        for (const request of requestHistory.value.orders) {
          const entries = []

          entries.push({
            text: request.code,
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
              href: `#`,
              // href: `${PATH_EMPOLIS}/${request.downloadLink}`,
              target: '_blank',
            },
            // {
            //   desktop: false,
            //   mobile: true,
            //   label: i18n.t('product.download'),
            //   icon: 'request_download',
            //   variant: 'secondary',
            //   shape: 'outlined',
            //   href: `${PATH_EMPOLIS}/${request.downloadLink}`,
            //   target: '_blank',
            //   download: isStepFile(request) ? `${request.title}.stp` : null,
            // },
          ]

          result.push({
            entries,
            actions,
          })
        }
      }

      return result
    })

    console.log(requestHistory.value.orders)

    return { requestHistory, header, tableData }
  },
})
</script>
