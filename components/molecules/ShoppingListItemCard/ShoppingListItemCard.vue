<template>
  <div class="shopping-list-item-card">
    <div v-if="productImage" class="shopping-list-item-card__image">
      <Link :href="url">
        <ResponsiveImage
          :image="productImage"
          provider="hybris"
          aspect-ratio="1:1"
        />
      </Link>
    </div>
    <div class="shopping-list-item-card__title">
      <h2 class="shopping-list-item-card__title__main-title">
        <Link :href="url">{{ productName }}</Link>
      </h2>
      <p class="shopping-list-item-card__title__sub-title">
        {{ orderNumber }}
      </p>
    </div>
    <div v-if="details" class="shopping-list-item-card__details">
      <template v-for="detail in details">
        <Tag
          v-for="(variant, id) in detail.variationValues"
          :key="detail.code + id"
          class="shopping-list-item-card__details__detail"
          :label="detail.name"
          :content="variant.displayValue"
        />
      </template>
    </div>
    <PvInput
      v-model="quantityModel"
      input-type="number"
      class="shopping-list-item-card__quantity"
      :disabled="isInactive"
      @input="updateQuantity"
    />
    <div
      v-if="!isLoggedIn || !isPriceVisible"
      class="shopping-list-item-card__price-error"
    >
      <LoginToSeePricesLabel v-if="!isLoggedIn" />
      <span v-else>{{ noPriceReason }}</span>
    </div>
    <div
      v-if="isLoggedIn && isPriceVisible"
      class="shopping-list-item-card__price"
    >
      <span class="shopping-list-item-card__price__label">
        {{ $t('cart.productPrice') }}
      </span>
      <span class="shopping-list-item-card__price__price">{{
        productPrice
      }}</span>
    </div>
    <div
      v-if="isLoggedIn && isPriceVisible"
      class="shopping-list-item-card__total-price"
    >
      <span class="shopping-list-item-card__total-price__label">
        {{ $t('cart.totalPrice') }}
      </span>
      <span class="shopping-list-item-card__total-price__price">
        {{ totalPrice }}
      </span>
    </div>
    <Button
      class="shopping-list-item-card__delete"
      variant="secondary"
      shape="plain"
      icon="delete"
      @click="deleteFromCart"
    />
    <div class="shopping-list-item-card__actions">
      <Button
        class="shopping-list-item-card__actions__add-to-list"
        variant="secondary"
        shape="plain"
        icon="assignment"
        :label="$t('cart.list.addToAnotherList')"
        @click="addToShoppingList"
      />
      <Button
        class="shopping-list-item-card__actions__add-to-cart"
        icon="shopping_cart"
        :label="$t('product.addToCart')"
        @click="addToCart"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  toRefs,
  useContext,
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import Link from '~/components/atoms/Link/Link'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import Tag from '~/components/atoms/Tag/Tag'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useDebounceFn } from '@vueuse/core'
import { useCartStore } from '~/stores/cart'

export default defineComponent({
  name: 'ShoppingListItemCard',
  components: {
    Button,
    Link,
    ResponsiveImage,
    PvInput,
    Tag,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    price: {
      type: Object,
      default: null,
      required: false,
    },
    quantity: {
      type: Number,
      default: 1,
      required: false,
    },
  },
  emits: ['addToShoppingList', 'delete', 'update'],
  setup(props, { emit }) {
    const { app, i18n } = useContext()
    const userStore = useUserStore()
    const cartStore = useCartStore()
    const { price, quantity, product } = toRefs(props)
    const quantityModel = ref(quantity.value)
    const {
      isApprovedUser,
      isLeadUser,
      isOpenUser,
      isRejectedUser,
      isLoggedIn,
    } = storeToRefs(userStore)
    const { addProductToCart } = cartStore

    const noPriceReason = computed(() => {
      const path = 'product.login.loginToSeePrices.'
      if (!price.value) return i18n.t('product.priceOnRequest')
      if (isLeadUser.value) return i18n.t(path + 'lead')
      if (isOpenUser.value) return i18n.t(path + 'open')
      if (isRejectedUser.value) return i18n.t(path + 'rejected')
      return i18n.t('product.noPriceAvailable')
    })

    const isPriceVisible = computed(
      () => !!(price.value && isApprovedUser.value)
    )

    const getPriceString = (priceValue) => {
      if (price.value === null) {
        return '-'
      }
      return `€ ${priceValue.toFixed(2).toLocaleString()}`
    }

    const productPrice = computed(() => {
      return getPriceString(price.value?.value)
    })

    const totalPrice = computed(() => {
      return getPriceString(quantityModel.value * price.value?.value)
    })

    const productImage = computed(() => {
      return product.value?.images?.[0] || null
    })

    const productName = computed(() => {
      return product.value?.name || ''
    })

    const orderNumber = computed(() => {
      return product.value?.orderNumber || ''
    })

    const details = computed(
      () => product.value.variationMatrix?.variationAttributes
    )

    const addToShoppingList = () => {
      emit('addToShoppingList', {
        ...product.value,
        quantity: quantityModel.value,
      })
    }
    const deleteFromCart = () => {
      emit('delete', { ...product.value, quantity: quantityModel.value })
    }

    const addToCart = async () => {
      await addProductToCart(product.value?.code, quantityModel.value)
    }

    const updateCartQuantity = useDebounceFn(() => {
      emit('update', { ...product.value, quantity: quantityModel.value })
    }, 500)

    const url = computed(() =>
      app.localePath({
        name: 'shop-products-product',
        params: { product: product.value?.code },
      })
    )
    const isInactive = computed(() => {
      return product.value?.purchasable === false
    })

    const updateQuantity = (value) => {
      if (value > 1) {
        quantityModel.value = value
      } else {
        quantityModel.value = 1
      }
      updateCartQuantity()
    }

    return {
      quantityModel,
      isInactive,
      updateQuantity,
      url,
      productPrice,
      totalPrice,
      details,
      productImage,
      addToShoppingList,
      deleteFromCart,
      productName,
      orderNumber,
      isLoggedIn,
      isPriceVisible,
      noPriceReason,
      addToCart,
    }
  },
})
</script>

<style lang="scss">
.shopping-list-item-card {
  @apply tw-grid tw-grid-cols-12 tw-auto-rows-auto;
  @apply tw-border-b tw-border-b-pv-grey-80;

  &__image {
    @apply tw-row-start-1 tw-row-end-2;
    @apply tw-col-start-1 tw-col-end-3;
    @apply tw-flex;
    @screen md {
      @apply tw-col-end-2;
    }
    @screen lg {
      @apply tw-mr-4;
    }
  }

  &__title {
    @apply tw-row-start-1 tw-row-end-2;
    @apply tw-col-start-4 tw-col-end-12;
    @apply tw-flex tw-flex-col;
    @apply tw-ml-4;

    @screen md {
      @apply tw-col-start-2;
    }

    @screen lg {
      @apply tw-ml-0;
      @apply tw-my-auto;
      @apply tw-col-start-2 tw-col-end-8;
    }

    &__main-title {
      @apply tw-text-base;
      @apply tw-leading-6;
      @screen lg {
        @apply tw-text-lg;
        @apply tw-leading-7;
      }
    }

    &__sub-title {
      @apply tw-text-base;
      @apply tw-text-pv-grey-48;
    }
  }

  &__quantity {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-1 tw-col-end-5;
    @apply tw-mt-4;
    @apply tw-flex;
    @apply tw-pr-1;
    @screen lg {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-9 tw-col-end-10;
      @apply tw-w-20;
      @apply tw-my-auto;
    }
  }

  &__price-error {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-5 tw-col-end-13;
    @apply tw-flex;
    @apply tw-mt-4;

    @screen lg {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-10 tw-col-end-12;
      @apply tw-m-auto;
    }

    .login-to-see-prices-label {
      text-align: end;
      @apply tw-my-auto;
      @apply tw-ml-auto;
    }
  }

  &__price {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-5 tw-col-end-13;
    @apply tw-leading-6;
    @apply tw-flex;
    @apply tw-ml-auto;
    @apply tw-mt-4;

    @screen md {
      @apply tw-my-auto;
      @apply tw-col-start-9 tw-col-end-11;
    }

    @screen lg {
      @apply tw-row-start-1 tw-row-end-1;
      @apply tw-col-start-10 tw-col-end-11;
      @apply tw-text-lg;
      @apply tw-leading-7;
      @apply tw-mx-auto;
    }

    &__label {
      @apply tw-text-xs;
      @apply tw-ml-2;

      @screen lg {
        @apply tw-hidden;
      }
    }

    &__price {
      @apply tw-ml-2;
    }
  }

  &__total-price {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-5 tw-col-end-13;
    @apply tw-leading-6;
    @apply tw-flex;
    @apply tw-mt-auto;
    @apply tw-ml-auto;

    @screen md {
      @apply tw-mb-auto;
      @apply tw-col-start-11 tw-col-end-13;
    }

    @screen lg {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-11 tw-col-end-12;
      @apply tw-mt-auto;
      @apply tw-mx-auto;
    }

    &__label {
      @apply tw-text-xs;

      @screen lg {
        @apply tw-hidden;
      }
    }

    &__price {
      @apply tw-text-base;
      @apply tw-font-bold;
      @apply tw-ml-2;

      @screen lg {
        @apply tw-text-lg;
        @apply tw-leading-7;
        @apply tw-font-normal;
      }
    }
  }

  &__delete {
    @apply tw-row-start-1 tw-row-end-2;
    @apply tw-col-start-12 tw-col-end-13;
    @apply tw-mb-auto;
    @apply tw-ml-auto;

    @screen lg {
      @apply tw-mt-auto;
    }
  }

  &__details {
    @apply tw-hidden;
    @apply tw-row-start-3 tw-row-end-4;
    @apply tw-col-start-1 tw-col-end-13;

    @screen md {
      @apply tw-flex tw-flex-wrap;
      @apply tw-mt-4;
    }

    @screen lg {
      @apply tw-row-start-2 tw-row-end-3;
      @apply tw-col-start-2 tw-col-end-8;
      @apply tw-mt-0;
    }

    &__detail {
      @apply tw-mr-2;
      @apply tw-mb-2;

      &:last-child {
        @apply tw-mr-0;
      }
    }
  }

  &__actions {
    @apply tw-row-start-3 tw-row-end-4;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-flex tw-flex-col;
    @apply tw-py-4;

    @screen md {
      @apply tw-row-start-4 tw-row-end-5;
      @apply tw-flex-row;
    }

    @screen lg {
      @apply tw-row-start-3 tw-row-end-4;
      @apply tw-col-start-2 tw-col-end-13;
      @apply tw-pb-6;
    }

    &__add-to-list {
      @apply tw-mx-auto;
      @apply tw-mb-4;

      @screen md {
        @apply tw-mx-0;
        @apply tw-my-auto;
      }

      @screen lg {
        @apply tw-my-0;
      }
    }

    &__add-to-cart {
      @screen md {
        @apply tw-ml-6;
      }
    }
  }
}
</style>
