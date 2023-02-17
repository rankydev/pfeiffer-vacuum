<template>
  <div class="cart-item-wrapper">
    <div v-if="!isMiniCart" class="cart-item-header">
      <div class="cart-item-header__quantity">
        <span>{{ $t('cart.quantity') }}</span>
      </div>
      <span class="cart-item-header__price" @click="sortByPrice">
        {{ $t('cart.pricePerUnit') }}
        <Icon icon="unfold_more" />
      </span>
      <span class="cart-item-header__totalPrice" @click="sortByPrice">
        {{ $t('cart.totalPrice') }}
        <Icon icon="unfold_more" />
      </span>
    </div>
    <CartItemCard
      v-for="{
        product,
        quantity,
        promotion,
        basePrice,
        code,
      } in getSortedProducts"
      :key="getUniqueId(code)"
      :product="product"
      :price="basePrice"
      :quantity="quantity"
      :promotion="promotion"
      :is-mini-cart="isMiniCart"
      @update="updateCartQuantity"
      @delete="deleteFromCart"
    />
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import CartItemCard from '~/components/molecules/CartItemCard/CartItemCard'
import Button from '~/components/atoms/Button/Button'
import useUniqueKey from '~/composables/useUniqueKey'
import Icon from '~/components/atoms/Icon/Icon'
import { useCartStore } from '~/stores/cart'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'CartTable',
  components: {
    CartItemCard,
    Button,
  },
  props: {
    isMiniCart: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['update', 'addToShoppingList'],
  setup() {
    const priceSortedDsc = ref(false)
    const totalPriceDsc = ref(false)
    const lastSortedBy = ref(null)
    const cartStore = useCartStore()
    const { currentCart } = storeToRefs(cartStore)
    const { deleteProductFromCart, updateProductQuantityFromCart } = cartStore
    const getUniqueId = (id) => useUniqueKey('CART_TABLE_' + id)
    const getProducts = computed(() => {
      return currentCart?.value?.entries
    })
    const getSortedProducts = computed(() => {
      if (lastSortedBy.value === 'price') {
        return sortByPrice()
      }
      if (lastSortedBy.value === 'totalPrice') {
        return sortByTotalPrice()
      }
      return getProducts.value
    })

    const sortByPrice = () => {
      return [...getProducts.value].sort((a, b) => {
        return priceSortedDsc.value
          ? b?.basePrice?.value - a?.basePrice?.value
          : a?.basePrice?.value - b?.basePrice?.value
      })
    }

    const sortByTotalPrice = () => {
      return [...getProducts.value].sort((a, b) => {
        return totalPriceDsc.value
          ? b?.totalPrice?.value - a?.totalPrice?.value
          : a?.totalPrice?.value - b?.totalPrice?.value
      })
    }

    const useSortByTotalPrice = () => {
      if (lastSortedBy.value === 'totalPrice') {
        totalPriceDsc.value = !totalPriceDsc.value
      } else {
        totalPriceDsc.value = true
        lastSortedBy.value = 'totalPrice'
      }
    }

    const useSortByPrice = () => {
      if (lastSortedBy.value === 'totalPrice') {
        totalPriceDsc.value = !totalPriceDsc.value
      } else {
        totalPriceDsc.value = true
        lastSortedBy.value = 'totalPrice'
      }
    }

    const findProductIndexInCart = (product) => {
      return getProducts.value.findIndex((item) => {
        return item?.product?.code === product.code
      })
    }

    const updateCartQuantity = async (product) => {
      const index = findProductIndexInCart(product)
      await updateProductQuantityFromCart(index, product?.quantity)
    }

    const deleteFromCart = async (product) => {
      const index = findProductIndexInCart(product)
      await deleteProductFromCart(index)
    }

    return {
      updateCartQuantity,
      deleteFromCart,
      getSortedProducts,
      useSortByPrice,
      useSortByTotalPrice,
      getUniqueId,
    }
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
    @apply tw-pl-4;
  }

  &__totalPrice {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-11 tw-col-end-12;
    @apply tw-flex;
    @apply tw-m-auto;
    @apply tw-w-fit;
    @apply tw-pl-4;
  }
}
</style>
