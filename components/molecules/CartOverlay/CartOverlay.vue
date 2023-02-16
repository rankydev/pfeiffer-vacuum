<template>
  <div v-show="isOpen" class="cart-overlay">
    <div class="cart-overlay-title">
      <h2 class="cart-overlay-title__title">
        <span>{{ $t('cart.shoppingCart') }}</span>
        <span
          v-if="getTotalCartUniqueItems > 0"
          class="cart-overlay-title__title-count"
        >
          ({{ getTotalCartUniqueItems }})
        </span>
      </h2>
      <Icon
        icon="close"
        class="cart-overlay-title__close"
        @click="closeOverlay"
      />
    </div>
    <div class="cart-overlay-content">
      <CartTable
        class="cart-overlay-content__table"
        :is-mini-cart="isMiniCart"
      />
      <div class="cart-overlay-content__total">
        <span class="cart-overlay-content__total-label">
          {{ $t('cart.overall1') }}
        </span>
        <span class="cart-overlay-content__total-tax">
          {{ $t('cart.overall2') }}
        </span>
        <span class="cart-overlay-content__total-value">
          {{ cartTotal }}
        </span>
      </div>
      <div class="cart-overlay-content__navigation">
        <Button
          class="cart-overlay-content__navigation-checkout"
          :label="$t('cart.checkout')"
          icon="arrow_forward"
          @click="goToCheckout"
        />
        <Button
          class="cart-overlay-content__navigation-edit"
          variant="secondary"
          shape="plain"
          icon="shopping_cart"
          :label="$t('cart.editCart')"
          @click="goToCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import CartTable from '../CartTable/CartTable.vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'CartOverlay',
  components: {
    CartTable,
  },
  setup() {
    const router = useRouter()
    const { localePath } = useContext()
    const isMiniCart = ref(true)
    const cartStore = useCartStore()
    const { currentCart } = storeToRefs(cartStore)
    const { entries } = currentCart.value
    const isOpen = ref(true)
    const prices = ref([])

    const getTotalCartUniqueItems = computed(() => {
      return currentCart?.value?.totalItems
    })
    const getPrice = (index) => {
      return prices[index]?.value ? prices[index]?.value : 0
    }

    const cartTotalValue = computed(() => {
      let total = 0
      entries?.forEach((entry, index) => {
        total += getPrice(getPrice(index)) * entry.quantity
      })
      return total
    })
    const cartTotal = computed(() => {
      return `€ ${cartTotalValue.value.toFixed(2).toLocaleString()}`
    })
    const goToCheckout = () => {
      // Todo: !!! ask for route maybe wrong !!!!
      router.push({ name: 'shop-checkout' })
      closeOverlay()
    }
    const goToCart = () => {
      router.push(localePath('shop-cart'))
      closeOverlay()
    }
    const closeOverlay = () => {
      isOpen.value = false
    }

    return {
      currentCart,
      isMiniCart,
      cartTotal,
      isOpen,
      closeOverlay,
      goToCheckout,
      goToCart,
      getTotalCartUniqueItems,
    }
  },
})
</script>
<style lang="scss">
.cart-overlay {
  @apply tw-ml-4;
  @apply tw-border tw-border-pv-grey-96;
  @apply tw-rounded-tl-lg;
  @apply tw-rounded-bl-lg;
  @apply tw-bg-pv-grey-96;
  @apply tw-flex;
  @apply tw-flex-col;
  @apply tw-h-full;
  @apply tw-fixed tw-top-0 tw-right-0;
  @apply tw-z-[9999] !important;
  @screen md {
    @apply tw-ml-0;
    @apply tw-w-1/2;
  }

  @screen lg {
    @apply tw-w-1/3;
  }

  &-title {
    @apply tw-flex;
    @apply tw-p-4;
    @apply tw-bg-pv-white;
    @apply tw-h-[60px];

    &__title {
      @apply tw-text-lg;
      @apply tw-leading-7;

      &-count {
        @apply tw-font-normal;
      }
    }

    &__close {
      @apply tw-ml-auto;
      @apply tw-cursor-pointer;
    }
  }

  &-content {
    @apply tw-p-4;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-h-[calc(100%-60px)];

    &__table {
      @apply tw-p-4;
      @apply tw-bg-pv-white;
      @apply tw-overflow-y-auto;
      @apply tw-overflow-x-hidden;
      @apply tw-border-b-2 tw-border-b-pv-black;
      @apply tw-h-full;
    }

    &__total {
      @apply tw-flex;
      @apply tw-border-b-2 tw-border-b-pv-black;
      @apply tw-py-4;
      @apply tw-text-base;
      @apply tw-leading-6;
      @apply tw-font-bold;
      @apply tw-h-[60px];

      &-tax {
        @apply tw-font-normal;
      }

      &-value {
        @apply tw-ml-auto;
      }
    }

    &__navigation {
      @apply tw-flex;
      @apply tw-flex-col;
      @apply tw-mt-4;
      @apply tw-h-[112px];

      @screen md {
        @apply tw-flex-row-reverse;
        @apply tw-h-12;
      }

      &-checkout {
        @apply tw-w-auto;

        @screen md {
          @apply tw-ml-auto;
        }
      }

      &-edit {
        @apply tw-w-fit;
        @apply tw-mx-auto;

        @screen md {
          @apply tw-mx-0;
        }
      }
    }
  }
}
</style>
