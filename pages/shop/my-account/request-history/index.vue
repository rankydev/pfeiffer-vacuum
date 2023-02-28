<template>
  <div>
    <MyAccountHeading />
    <div
      class="tw-flex tw-bg-pv-grey-88 tw-rounded-md tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-2xl tw-text-center"
      style="height: 800px"
    >
      <div>RequestHistory</div>
      <!-- <TableView :header="header" /> -->
      {{ requestHistory.orders }}
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  onServerPrefetch,
  ref,
} from '@nuxtjs/composition-api'
import MyAccountHeading from '~/components/organisms/MyAccount/partials/MyAccountHeading'
// import TableView from '~/components/molecules/GenericTable/partials/TableView'
import { useRequestHistoryStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'RequestHistory',
  components: {
    MyAccountHeading,
    // TableView,
  },
  setup() {
    const requestHistoryStore = useRequestHistoryStore()
    const { loadRequestHistory } = requestHistoryStore

    const { requestHistory } = storeToRefs(requestHistoryStore)
    onBeforeMount(loadRequestHistory)
    onServerPrefetch(loadRequestHistory)

    const header = ref([
      { title: 'Request number' },
      { title: 'Reference' },
      { title: 'Date' },
      { title: 'Total (net)' },
    ])

    console.log(requestHistory)

    return { requestHistory, header }
  },
})
</script>
