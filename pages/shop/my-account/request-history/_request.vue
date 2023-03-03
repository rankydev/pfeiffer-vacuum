<template>
  <div>
    <ResultHeadline
      :headline="headline"
      :link="localePath('shop-my-account-request-history')"
    />
    <span>{{ requestId }}</span>
    <div class="cart-item-wrapper">
      <div class="cart-item-header">
        <div class="cart-item-header__quantity">
          <span>{{ $t('cart.quantity') }}</span>
        </div>
        <span class="cart-item-header__price">
          {{ $t('cart.pricePerUnit') }}
        </span>
        <span class="cart-item-header__totalPrice">
          {{ $t('cart.totalPrice') }}
        </span>
      </div>
      <div v-for="product in productList" :key="product.entryNumber">
        <CartItemCard v-bind="product" />
      </div>
    </div>
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

    const addToCart = async (product) => {
      await addProductToCart(product?.value?.code, quantityModel?.value)
    }

    console.log(orderDate)

    return { requestId, currentOrder, productList, orderDate, headline }
  },
})
</script>
<style lang="scss">
.cart-item-header {
  @apply tw-hidden;
  @apply tw-border-b tw-border-b-pv-grey-80;

  @screen lg {
    @apply tw-grid tw-grid-rows-1 tw-grid-cols-12;
    @apply tw-pb-4;
  }

  &__quantity {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-9 tw-col-end-10;
    @apply tw-flex;
    @apply tw-my-auto;
    @apply tw-text-pv-grey-32;
  }

  &__price,
  &__totalPrice {
    @apply tw-cursor-pointer;
    @apply tw-text-pv-grey-32;
    @apply tw-font-normal;
    @apply tw-block;
    @apply tw-leading-4;

    &:hover {
      @apply tw-text-pv-grey-48;
    }
  }

  &__price {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-10 tw-col-end-11;
    @apply tw-flex;
    @apply tw-m-auto;
    @apply tw-w-fit;
    @apply tw-pl-2;
  }

  &__totalPrice {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-11 tw-col-end-12;
    @apply tw-flex;
    @apply tw-m-auto;
    @apply tw-w-fit;
    @apply tw-pl-2;
  }

  .icon__material.icon--base {
    @apply tw-text-base;
  }
}
</style>
