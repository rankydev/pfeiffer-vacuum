<template>
  <div class="request-history-detail-page">
    <ResultHeadline
      :headline="headline"
      :link="localePath('shop-my-account-request-history')"
    />
    <LoadingSpinner :show="isLoadingContent">
      <template v-if="Object.keys(currentOrder).length">
        <span>{{ $t('myaccount.requestHistory.table.requestDate') }}</span>
        <span class="request-history-detail-page__date">{{
          $d(orderDate, 'date')
        }}</span>
        <div>
          <div class="request-history-detail-page-table-header">
            <div class="request-history-detail-page-table-header__quantity">
              <span>{{ $t('myaccount.requestHistory.table.quantity') }}</span>
            </div>
            <span class="request-history-detail-page-table-header__price">
              {{ $t('myaccount.requestHistory.table.pricePerUnit') }}
            </span>
            <span class="request-history-detail-page-table-header__totalPrice">
              {{ $t('myaccount.requestHistory.table.totalPrice') }}
            </span>
          </div>
          <div
            v-for="(product, index) in productList"
            :key="product.entryNumber"
          >
            <ShoppingListItemCard
              v-bind="product"
              :promotion="getProductPromotions(index)"
              :price-total="product.totalPrice"
              :is-read-only="true"
              variant="requestHistory"
              @addToShoppingList="addToShoppingList"
            />
          </div>
        </div>
        <div class="request-history-detail-page-total">
          <div class="request-history-detail-page-total__promotion-wrapper">
            <PromotionLabel
              v-for="promotion in promotions"
              :key="promotion.promotion.code"
              class="request-history-detail-page-total__promotion request-history-detail-page-total__promotion--desktop"
              :subline="promotion.description"
            />
            <Button
              class="request-history-detail-page-total__back-btn"
              :href="localePath('shop-my-account-request-history')"
              :label="$t('myaccount.addressDataAddPageLinkBtn')"
              variant="secondary"
              shape="plain"
              icon="arrow_back"
              :prepend-icon="true"
            />
          </div>
          <div class="request-history-detail-page-total__wrapper-total-net">
            <div class="request-history-detail-page-total__total-net">
              <PromotionLabel
                v-for="promotion in promotions"
                :key="promotion.promotion.code"
                class="request-history-detail-page-total__promotion--mobile"
                :subline="promotion.description"
              />
              <TotalNetInformation :current-cart="currentOrder" />
            </div>
            <!-- TODO: implement Button in PVWEB-981 here  -->
            <!-- <div class="request-history-detail-page-total__total-net-btn">
              <Button
                :label="$t('myaccount.requestHistory.addToCartBtn')"
                variant="primary"
                icon="mail_outline"
                @click="addToCart"
              />
            </div> -->
          </div>
        </div>
      </template>
    </LoadingSpinner>
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
  onUnmounted,
} from '@nuxtjs/composition-api'
import { useRequestHistoryStore } from '~/stores/myaccount'
import { storeToRefs } from 'pinia'
import ShoppingListItemCard from '~/components/molecules/ShoppingListItemCard/ShoppingListItemCard'
import TotalNetInformation from '~/components/molecules/TotalNetInformation/TotalNetInformation.vue'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import { useShoppingLists } from '@/stores/shoppinglists'

export default defineComponent({
  components: {
    ShoppingListItemCard,
    TotalNetInformation,
    LoadingSpinner,
  },
  setup() {
    const { i18n } = useContext()
    const route = useRoute()

    const shoppingListsStore = useShoppingLists()

    const requestHistoryStore = useRequestHistoryStore()
    const { loadOrderContent } = requestHistoryStore
    const { currentOrder, isLoadingContent } = storeToRefs(requestHistoryStore)

    const requestId = ref(route.value.params.request)

    const headline = ref(
      i18n.t('myaccount.requestHistory.table.requestReference') +
        `: ${requestId.value}`
    )

    onMounted(async () => {
      await loadOrderContent(requestId.value)
    })

    onUnmounted(() => {
      currentOrder.value = {}
    })

    const productList = computed(() => {
      return currentOrder?.value?.entries
    })

    const orderDate = computed(() => {
      if (currentOrder?.value?.created) {
        return new Date(currentOrder?.value?.created)
      }
      return null
    })

    const getProductPromotions = (index) => {
      const productPromotion = {}

      currentOrder?.value?.appliedProductPromotions?.forEach((item) => {
        if (item.consumedEntries?.find((e) => e.orderEntryNumber === index)) {
          Object.assign(productPromotion, item)
        }
      })

      return productPromotion
    }

    const promotions = computed(() => {
      return currentOrder?.value?.appliedOrderPromotions
    })

    const hasPromotion = computed(() => {
      return promotions.value?.length
    })

    const addToShoppingList = (cartItem) => {
      shoppingListsStore.setProductAmount(cartItem?.quantity)
      shoppingListsStore.setProduct(cartItem)
      shoppingListsStore.toggleOverlay()
    }

    return {
      isLoadingContent,
      requestId,
      currentOrder,
      productList,
      orderDate,
      headline,
      promotions,
      hasPromotion,
      getProductPromotions,
      addToShoppingList,
    }
  },
})
</script>
<style lang="scss">
.request-history-detail-page {
  &__date {
    @apply tw-font-bold;
  }

  &-table-header {
    @apply tw-hidden;
    @apply tw-border-b tw-border-b-pv-grey-80;

    @screen lg {
      @apply tw-grid tw-grid-rows-1 tw-grid-cols-12;
      @apply tw-pb-4;
    }

    &__quantity {
      @apply tw-row-start-1 tw-row-end-1;
      @apply tw-col-start-8 tw-col-end-9;
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
      @apply tw-col-start-12 tw-col-end-12;
      @apply tw-flex;
      @apply tw-m-auto;
      @apply tw-w-fit;
      @apply tw-pl-2;
    }

    .icon__material.icon--base {
      @apply tw-text-base;
    }
  }

  &-total {
    @apply tw-flex;
    @apply tw-flex-col-reverse;

    @screen md {
      @apply tw-flex-row;
    }

    &__promotion-wrapper {
      @apply tw-flex;
      @apply tw-flex-col;
      @apply tw-justify-between;

      @screen md {
        @apply tw-w-full;
        @apply tw-w-1/2;
      }
    }

    &__promotion {
      @apply tw-mt-6;

      &--desktop {
        @apply tw-hidden;

        @screen md {
          @apply tw-flex;
        }
      }

      &--mobile {
        @apply tw-flex;
        @apply tw-mb-6;

        @screen md {
          @apply tw-hidden;
        }
      }
    }

    &__back-btn {
      @apply tw-flex;
      @apply tw-justify-start;
    }

    &__wrapper-total-net {
      @apply tw-w-full;

      @screen md {
        @apply tw-w-1/2;
        @apply tw-ml-6;
      }
    }

    &__total-net {
      @apply tw-my-6;
    }

    &__total-net-btn {
      @apply tw-w-full;
      @apply tw-flex;
      @apply tw-flex-col;
      @apply tw-mt-6;
    }
  }
}
</style>
