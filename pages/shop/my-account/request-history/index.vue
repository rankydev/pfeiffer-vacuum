<template>
  <div>
    <MyAccountHeading />
    <div
      class="tw-flex tw-bg-pv-grey-88 tw-rounded-md tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-2xl tw-text-center"
      style="height: 800px"
    >
      <div>RequestHistory</div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onBeforeMount,
  onServerPrefetch,
} from '@nuxtjs/composition-api'
import MyAccountHeading from '~/components/organisms/MyAccount/partials/MyAccountHeading'
import { useRequestHistoryStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'RequestHistory',
  components: {
    MyAccountHeading,
  },
  setup() {
    const requestHistoryStore = useRequestHistoryStore()
    const { loadRequestHistory } = requestHistoryStore
    const { requestHistory } = storeToRefs(requestHistoryStore)

    onBeforeMount(loadRequestHistory)
    onServerPrefetch(loadRequestHistory)

    return { requestHistory }
  },
})
</script>
