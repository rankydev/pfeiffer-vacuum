<template>
  <div class="cart-item-wrapper">
    <div v-if="!isMiniCart" class="cart-item-header">
      <div class="cart-item-header__quantity">
        <span>{{ $t('cart.quantity') }}</span>
      </div>
      <Button
        class="cart-item-header__price"
        variant="secondary"
        shape="plain"
        icon="unfold_more"
        :label="$t('cart.pricePerUnit')"
        @click="sortByPrice"
      />
      <Button
        class="cart-item-header__totalPrice"
        variant="secondary"
        shape="plain"
        icon="unfold_more"
        :label="$t('cart.totalPrice')"
        @click="sortByTotalPrice"
      />
    </div>
    <CartItemCard
      v-for="({ product, quantity, promotion }, index) in sortedCart ||
      getProducts"
      :key="getUniqueId(index)"
      :product="product"
      :price="getPriceItem(index)"
      :quantity="quantity"
      :promotion="promotion"
      :is-mini-cart="isMiniCart"
      @add="addToCart"
      @remove="removeFromCart"
      @delete="deleteFromCart"
      @addToShoppingList="addToShoppingList"
    />
  </div>
</template>

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import CartItemCard from '~/components/molecules/CartItemCard/CartItemCard'
import Button from '~/components/atoms/Button/Button'
import useUniqueKey from '~/composables/useUniqueKey'
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
  setup(props, { emit }) {
    const priceSortedAsc = ref(true)
    const totalPriceSortedAsc = ref(true)
    const prices = ref([])
    const cartStore = useCartStore()
    const { currentCart } = storeToRefs(cartStore)
    const { addProductToCart } = cartStore
    const getProducts = computed(() => currentCart.value.entries)
    const sortedCart = ref(null)

    const getPriceItem = (index) => {
      if (prices[index]) return prices[index]
      return null
    }

    const getPrice = (priceItem) => {
      return priceItem?.value ? priceItem.value : 0
    }

    const sortByPrice = () => {
      const products = sortedCart.value || getProducts.value
      priceSortedAsc.value = !priceSortedAsc.value
      sortedCart.value = products.sort((a, b) => {
        return priceSortedAsc.value
          ? getPrice(a) - getPrice(b)
          : getPrice(b) - getPrice(a)
      })
    }

    const sortByTotalPrice = () => {
      const products = sortedCart.value || getProducts.value
      totalPriceSortedAsc.value = !totalPriceSortedAsc.value
      sortedCart.value = products.value.sort((a, b) => {
        return totalPriceSortedAsc.value
          ? getPrice(a) * a?.quantity - getPrice(b) * b?.quantity
          : getPrice(b) * b?.quantity - getPrice(a) * a?.quantity
      })
    }

    const addToCart = (product) => {
      addProductToCart(product?.code, 1)
    }

    const removeFromCart = (product) => {
      addProductToCart(product?.code, -1)
    }

    const deleteFromCart = (product) => {
      sortedCart.value = sortedCart.value.filter(
        (item) => item?.product !== product
      )
      emit('update', sortedCart.value)
    }

    const addToShoppingList = (product) => {
      const cartItem = sortedCart.value.find(
        (item) => item?.product === product
      )
      emit('addToShoppingList', cartItem)
    }
    const getUniqueId = (id) => useUniqueKey('CART_TABLE_' + id)

    return {
      sortedCart,
      sortByPrice,
      sortByTotalPrice,
      addToCart,
      removeFromCart,
      deleteFromCart,
      addToShoppingList,
      getUniqueId,
      getPriceItem,
      getProducts,
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

  .button--plain.button--secondary {
    @apply tw-text-pv-grey-32;
    @apply tw-font-normal;
    -webkit-text-fill-color: var(--tw-pv-grey-32);

    :hover {
      @apply tw-text-pv-grey-48;
      -webkit-text-fill-color: var(--tw-pv-grey-48);
    }
  }

  &__quantity {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-9 tw-col-end-10;
    @apply tw-flex;
    @apply tw-my-auto;
    @apply tw-text-pv-grey-32;
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
