<template>
  <div class="shopping-list">
    <div class="shopping-list__header">
      <span class="shopping-list__header--quantity">
        {{ $t('cart.quantity') }}
      </span>
      <span
        class="shopping-list__header--price"
        :class="{ 'shopping-list__header--price__active': isSortable }"
        @click="useSortByPrice"
      >
        {{ $t('cart.pricePerUnit') }}
        <Icon v-if="isSortable" icon="unfold_more" />
      </span>
      <span v-if="!isSortable" class="shopping-list__header--totalPrice">
        {{ $t('cart.totalPrice') }}
      </span>
    </div>
    <ShoppingListItemCard
      v-for="{ product, amount, price, totalPrice, code } in getSortedProducts"
      :key="getUniqueId(code)"
      :product="product"
      :quantity="amount"
      :base-price="price"
      :price-total="totalPrice"
      :is-read-only="!isSortable"
      @add-to-shopping-list="addToShoppingList"
      @delete="deleteFromCart"
      @update="updateCartQuantity"
    />
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, computed } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon'
import useUniqueKey from '~/composables/useUniqueKey'
export default defineComponent({
  name: 'ShoppingList',
  components: {
    Icon,
  },
  props: {
    products: {
      type: Array,
      required: false,
      default: () => [],
    },
    isSortable: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['addToShoppingList', 'delete', 'update'],
  setup(props, { emit }) {
    const { products, isSortable } = toRefs(props)
    const getUniqueId = (id) => useUniqueKey('SHOPPING_LIST_' + id)
    const priceSortedDsc = ref(false)
    const lastSortedBy = ref(null)
    const getSortedProducts = computed(() => {
      if (lastSortedBy.value === 'price') {
        return sortByPrice()
      }
      return products.value
    })
    const sortByPrice = () => {
      return [...products.value].sort((a, b) => {
        return priceSortedDsc.value
          ? b?.basePrice?.value - a?.basePrice?.value
          : a?.basePrice?.value - b?.basePrice?.value
      })
    }

    const useSortByPrice = () => {
      if (isSortable.value) {
        priceSortedDsc.value = !priceSortedDsc.value
        lastSortedBy.value = 'price'
      }
    }

    const addToShoppingList = (cartItem) => {
      emit('addToShoppingList', cartItem)
    }
    const deleteFromCart = (cartItem) => {
      emit('delete', cartItem)
    }
    const updateCartQuantity = (cartItem) => {
      emit('update', cartItem)
    }

    return {
      getUniqueId,
      addToShoppingList,
      deleteFromCart,
      updateCartQuantity,
      getSortedProducts,
      useSortByPrice,
    }
  },
})
</script>
<style lang="scss">
.shopping-list {
  &__header {
    @apply tw-hidden;
    @apply tw-border-b tw-border-b-pv-grey-80;

    @screen lg {
      @apply tw-grid tw-grid-rows-1 tw-grid-cols-12;
      @apply tw-pb-4;
    }

    &--quantity {
      @apply tw-row-start-1 tw-row-end-1;
      @apply tw-col-start-9 tw-col-end-10;
      @apply tw-flex;
      @apply tw-my-auto;
      @apply tw-text-pv-grey-32;

      @screen lg {
        @apply tw-col-start-8 tw-col-end-10;
        @apply tw-my-auto;
        @apply tw-ml-auto;
        @apply tw-mr-8;
      }
    }

    &--price,
    &--totalPrice {
      @apply tw-text-pv-grey-32;
      @apply tw-font-normal;
      @apply tw-block;
      @apply tw-leading-4;

      &:hover {
        @apply tw-text-pv-grey-48;
      }
    }

    &--price {
      @apply tw-row-start-1 tw-row-end-1;
      @apply tw-col-start-10 tw-col-end-12;
      @apply tw-flex;
      @apply tw-m-auto;
      @apply tw-w-fit;
      @apply tw-pl-2;

      &__active {
        @apply tw-cursor-pointer;
      }
    }

    &--totalPrice {
      @apply tw-row-start-1 tw-row-end-1;
      @apply tw-col-start-12 tw-col-end-13;
      @apply tw-flex;
      @apply tw-m-auto;
      @apply tw-w-fit;
      @apply tw-pl-2;
    }

    .icon__material.icon--base {
      @apply tw-text-base;
    }
  }
}
</style>
