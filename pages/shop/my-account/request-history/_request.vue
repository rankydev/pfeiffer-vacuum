<template>
  <div>
    <span>{{ requestId }}</span>
    <span>{{ currentOrder }}</span>
    <span>salami</span>
  </div>
</template>

<script>
import {
  defineComponent,
  useRoute,
  ref,
  onMounted,
} from '@nuxtjs/composition-api'
import { useRequestHistoryStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const route = useRoute()

    const requestHistoryStore = useRequestHistoryStore()
    const { loadOrderContent } = requestHistoryStore
    const { currentOrder } = storeToRefs(requestHistoryStore)

    const requestId = ref(route.value.params.request)

    onMounted(async () => {
      await loadOrderContent(requestId.value)
    })

    return { requestId, currentOrder }
  },
})
</script>
