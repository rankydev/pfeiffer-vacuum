<template>
  <div>
    <span>{{ requestId }}</span>
    <!-- <CartTable /> -->
    <CartItemCard
      v-for="product in productList"
      :key="product.entryNumber"
      v-bind="product"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  useRoute,
  ref,
  computed,
  onMounted,
} from '@nuxtjs/composition-api'
import { useRequestHistoryStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'
import CartItemCard from '~/components/molecules/CartItemCard/CartItemCard'
// import CartTable from '~/components/molecules/CartTable/CartTable'

export default defineComponent({
  components: {
    CartItemCard,
    // CartTable,
  },
  setup() {
    const route = useRoute()

    const requestHistoryStore = useRequestHistoryStore()
    const { loadOrderContent } = requestHistoryStore
    const { currentOrder } = storeToRefs(requestHistoryStore)

    const requestId = ref(route.value.params.request)

    onMounted(async () => {
      await loadOrderContent(requestId.value)
    })

    const productList = computed(() => {
      return currentOrder?.value?.entries
    })

    console.log(productList)

    return { requestId, currentOrder, productList }
  },
})
</script>
