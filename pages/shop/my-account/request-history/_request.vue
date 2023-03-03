<template>
  <div>
    <ResultHeadline
      :headline="headline"
      :link="localePath('shop-my-account-request-history')"
    />
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
  useContext,
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
    const { i18n, app } = useContext()
    const route = useRoute()

    const requestHistoryStore = useRequestHistoryStore()
    const { loadOrderContent } = requestHistoryStore
    const { currentOrder } = storeToRefs(requestHistoryStore)

    const requestId = ref(route.value.params.request)

    const headline = ref(
      i18n.t('myaccount.requestHistory.table.requestReference') +
        `: ${requestId.value}`
    )

    onMounted(async () => {
      await loadOrderContent(requestId.value)
    })

    const productList = computed(() => {
      return currentOrder?.value?.entries
    })

    const orderDate = computed(() => {
      return currentOrder?.value?.created
    })

    console.log(orderDate)

    return { requestId, currentOrder, productList, orderDate, headline }
  },
})
</script>
