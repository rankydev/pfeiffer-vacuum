<template>
  <div class="cart-item-wrapper">
    <div
      v-if="!isMiniCart"
      class="cart-item-header"
      :class="{ 'cart-item-header--edit-mode': editMode }"
    >
      <div class="cart-item-header__quantity">
        <span>{{ $t('cart.quantity') }}</span>
      </div>
      <span class="cart-item-header__price" @click="useSortByPrice">
        {{ $t('cart.pricePerUnit') }}
        <Icon icon="unfold_more" />
      </span>
      <span class="cart-item-header__totalPrice" @click="useSortByTotalPrice">
        {{ $t('cart.totalPrice') }}
        <Icon icon="unfold_more" />
      </span>
    </div>
    <CartItemCard
      v-for="(
        { product, quantity, basePrice, totalPrice }, index
      ) in getSortedProducts"
      :key="product.code"
      :product="product"
      :base-price="basePrice"
      :price-total="totalPrice"
      :quantity="quantity"
      :promotion="getProductPromotions(index)"
      :is-mini-cart="isMiniCart"
      :edit-mode="editMode"
      @update="updateCartQuantity"
      @delete="deleteFromCart"
      @addToShoppingList="addToShoppingList"
    />
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import CartItemCard from '~/components/molecules/CartItemCard/CartItemCard'
import useUniqueKey from '~/composables/useUniqueKey'
import Icon from '~/components/atoms/Icon/Icon'
import { useCartStore } from '~/stores/cart'
import { storeToRefs } from 'pinia'
import { useShoppingLists } from '~/stores/shoppinglists'

export default defineComponent({
  name: 'CartTable',
  components: {
    CartItemCard,
    Icon,
  },
  props: {
    isMiniCart: {
      type: Boolean,
      default: false,
      required: false,
    },
    editMode: {
      type: Boolean,
      default: true,
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
    const shopppingListStore = useShoppingLists()
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
        return item?.product?.code === product?.code
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

    const getProductPromotions = (index) => {
      const productPromotion = {}

      currentCart?.value?.appliedProductPromotions?.forEach((item) => {
        if (item.consumedEntries?.find((e) => e.orderEntryNumber === index)) {
          Object.assign(productPromotion, item)
        }
      })

      return productPromotion
    }
    const addToShoppingList = (product) => {
      shopppingListStore.setProductAmount(product?.quantity)
      shopppingListStore.setProduct(product)
      shopppingListStore.toggleOverlay()
    }

    return {
      updateCartQuantity,
      deleteFromCart,
      getSortedProducts,
      useSortByPrice,
      useSortByTotalPrice,
      getUniqueId,
      getProductPromotions,
      addToShoppingList,
    }
  },
})
</script>

<style lang="scss" scoped>
.cart-item-header {
  @apply tw-hidden;

  @screen lg {
    @apply tw-grid tw-grid-rows-1 tw-grid-cols-11;
    @apply tw-border-b tw-border-b-pv-grey-80;
    @apply tw-pb-4;
  }

  &--edit-mode {
    @apply tw-grid-cols-12;
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
