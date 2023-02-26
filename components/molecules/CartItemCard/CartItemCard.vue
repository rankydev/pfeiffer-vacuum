<template>
  <div
    class="cart-item-card"
    :class="{ 'cart-item-card-desktop': !isMiniCart }"
  >
    <div v-if="productImage" class="cart-item-card-image">
      <Link :href="url">
        <ResponsiveImage
          :image="productImage"
          provider="hybris"
          aspect-ratio="1:1"
        />
      </Link>
    </div>
    <div class="cart-item-card-title">
      <h2 class="cart-item-card-title__main-title">
        <Link :href="url">{{ productName }}</Link>
      </h2>
      <p class="cart-item-card-title__sub-title">
        {{ orderNumber }}
      </p>
    </div>
    <Button
      v-if="details && isMiniCart"
      class="cart-item-card-details-button"
      variant="secondary"
      shape="plain"
      :icon="isDetailsExpanded ? 'arrow_upward' : 'arrow_downward'"
      :label="$t('cart.details')"
      @click="toggleDetails"
    />
    <div v-if="details && isDetailsExpanded" class="cart-item-card-details">
      <template v-for="detail in details">
        <Tag
          v-for="(variant, id) in detail.variationValues"
          :key="detail.code + id"
          class="cart-item-card-details__detail"
          :label="detail.name"
          :content="variant.displayValue"
        />
      </template>
    </div>
    <PromotionLabel
      v-if="promotion"
      class="cart-item-card-promotion"
      :subline="getPromotion"
    />
    <PvInput
      v-model="quantityModel"
      input-type="number"
      class="cart-item-card-quantity"
      :disabled="isInactive"
      @input="updateQuantity"
    />
    <div
      v-if="!isLoggedIn || !isPriceVisible"
      class="cart-item-card-price-error"
    >
      <LoginToSeePricesLabel v-if="!isLoggedIn" />
      <span v-else>{{ noPriceReason }}</span>
    </div>
    <div v-if="isLoggedIn && isPriceVisible" class="cart-item-card-price">
      <span class="cart-item-card-price__label">
        {{ $t('cart.productPrice') }}
      </span>
      <span class="cart-item-card-price__price">{{ productPrice }}</span>
    </div>
    <div v-if="isLoggedIn && isPriceVisible" class="cart-item-card-total-price">
      <span class="cart-item-card-total-price__label">
        {{ $t('cart.totalPrice') }}
      </span>
      <span class="cart-item-card-total-price__price">
        {{ getTotalPrice }}
      </span>
    </div>
    <Button
      class="cart-item-card-add-article"
      variant="secondary"
      shape="plain"
      icon="assignment"
      :label="$t('cart.list.addArticle')"
      @click="addToShoppingList"
    />
    <Button
      class="cart-item-card-delete"
      variant="secondary"
      shape="plain"
      icon="delete"
      @click="deleteFromCart"
    />
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

export default defineComponent({
  name: 'CartItemCard',
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
    basePrice: {
      type: Object,
      default: null,
      required: false,
    },
    totalPrice: {
      type: Object,
      default: null,
      required: false,
    },
    quantity: {
      type: Number,
      default: 1,
      required: false,
    },
    promotion: {
      type: Object,
      default: null,
      required: false,
    },
    isMiniCart: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  emits: ['addToShoppingList', 'update', 'delete'],
  setup(props, { emit }) {
    const { app, i18n } = useContext()
    const userStore = useUserStore()
    const { basePrice, totalPrice, isMiniCart, quantity, product, promotion } =
      toRefs(props)
    const quantityModel = ref(quantity.value)
    const {
      isApprovedUser,
      isLeadUser,
      isOpenUser,
      isRejectedUser,
      isLoggedIn,
    } = storeToRefs(userStore)

    const noPriceReason = computed(() => {
      const path = 'product.login.loginToSeePrices.'
      if (!basePrice.value) return i18n.t('product.priceOnRequest')
      if (isLeadUser.value) return i18n.t(path + 'lead')
      if (isOpenUser.value) return i18n.t(path + 'open')
      if (isRejectedUser.value) return i18n.t(path + 'rejected')
      return i18n.t('product.noPriceAvailable')
    })

    const isPriceVisible = computed(
      () => !!(basePrice.value && isApprovedUser.value)
    )

    const getPriceString = (priceValue) => {
      if (basePrice.value === null || !priceValue) {
        return '-'
      }
      return `${priceValue?.substring(0, 1)} ${priceValue?.substring(1)}`
    }

    const productPrice = computed(() => {
      return getPriceString(basePrice?.value?.formattedValue)
    })

    const getTotalPrice = computed(() => {
      return getPriceString(totalPrice?.value?.formattedValue)
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

    const isDetailsExpanded = ref(!isMiniCart.value)
    const toggleDetails = () => {
      isDetailsExpanded.value = !isDetailsExpanded.value
    }
    const addToShoppingList = () => {
      emit('addToShoppingList', {
        ...product.value,
        quantity: quantityModel.value,
      })
    }
    const deleteFromCart = () => {
      emit('delete', { ...product.value, quantity: quantityModel.value })
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

    const getPromotion = computed(() => {
      return promotion.value?.description
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
      getTotalPrice,
      details,
      isDetailsExpanded,
      toggleDetails,
      productImage,
      addToShoppingList,
      deleteFromCart,
      productName,
      orderNumber,
      isLoggedIn,
      isPriceVisible,
      noPriceReason,
      getPromotion,
    }
  },
})
</script>

<style lang="scss">
.cart-item-card {
  @apply tw-grid tw-grid-cols-12 tw-auto-rows-auto;
  @apply tw-border-b tw-border-b-pv-grey-80;
  @apply tw-mt-6;

  &-image {
    @apply tw-row-start-1 tw-row-end-2;
    @apply tw-col-start-1 tw-col-end-3;
    @apply tw-flex;
  }

  &-title {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-4 tw-col-end-12;
    @apply tw-flex tw-flex-col;
    @apply tw-ml-4;

    &__main-title {
      @apply tw-text-base;
      @apply tw-leading-6;
    }

    &__sub-title {
      @apply tw-text-base;
      @apply tw-text-pv-grey-48;
    }
  }

  &-quantity {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-1 tw-col-end-5;
    @apply tw-mt-4;
    @apply tw-flex;
    @apply tw-pr-1;
  }

  &-price-error {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-5 tw-col-end-13;
    @apply tw-flex;
    @apply tw-mt-4;

    .login-to-see-prices-label {
      text-align: end;
      @apply tw-my-auto;
      @apply tw-ml-auto;
    }
  }

  &-price {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-5 tw-col-end-13;
    @apply tw-leading-6;
    @apply tw-flex;
    @apply tw-ml-auto;
    @apply tw-mt-4;

    &__label {
      @apply tw-text-xs;
      @apply tw-ml-2;
    }

    &__price {
      @apply tw-ml-2;
    }
  }

  &-total-price {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-5 tw-col-end-13;
    @apply tw-leading-6;
    @apply tw-flex;
    @apply tw-mt-auto;
    @apply tw-ml-auto;

    &__label {
      @apply tw-text-xs;
    }

    &__price {
      @apply tw-text-base;
      @apply tw-font-bold;
      @apply tw-ml-2;
    }
  }

  &-delete {
    @apply tw-row-start-1 tw-row-end-2;
    @apply tw-col-start-12 tw-col-end-13;
    @apply tw-mb-auto;
    @apply tw-ml-auto;
  }

  &-details-button {
    @apply tw-row-start-3 tw-row-end-4;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-flex;
    @apply tw-mt-1;
    @apply tw-mx-auto;
    @apply tw-w-fit;

    @screen lg {
      @apply tw-row-start-6 tw-row-end-7;
      @apply tw-mx-0;
    }

    @screen 2xl {
      @apply tw-row-start-5 tw-row-end-6;
      @apply tw-m-auto;
    }
  }

  &-details {
    @apply tw-row-start-4 tw-row-end-5;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-flex tw-flex-wrap;
    @apply tw-mt-4;

    &__detail {
      @apply tw-mr-2;
      @apply tw-mb-2;

      &:last-child {
        @apply tw-mr-0;
      }
    }
  }

  &-promotion {
    @apply tw-row-start-5 tw-row-end-6;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-w-fit;
    @apply tw-h-fit;
    @apply tw-mt-4;
    @apply tw-py-1;
  }

  &-add-article {
    @apply tw-row-start-6 tw-row-end-7;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-w-fit;
    @apply tw-mx-auto;
    @apply tw-mb-3;
    @apply tw-mt-4;
  }
}

.cart-item-card-desktop {
  .cart-item-card {
    @screen lg {
      @apply tw-grid-rows-3;
    }

    &-image {
      @screen md {
        @apply tw-col-end-2;
      }
      @screen lg {
        @apply tw-mr-4;
      }
    }

    &-title {
      @screen md {
        @apply tw-col-start-2;
      }

      @screen lg {
        @apply tw-ml-0;
        @apply tw-my-auto;
        @apply tw-col-start-2 tw-col-end-8;
      }

      &__main-title {
        @screen lg {
          @apply tw-text-lg;
          @apply tw-leading-7;
        }
      }
    }

    &-quantity {
      @screen lg {
        @apply tw-row-start-1 tw-row-end-2;
        @apply tw-col-start-9 tw-col-end-10;
        @apply tw-w-20;
        @apply tw-my-auto;
      }
    }

    &-price-error {
      @screen lg {
        @apply tw-row-start-1 tw-row-end-2;
        @apply tw-col-start-10 tw-col-end-12;
        @apply tw-m-auto;
      }
    }

    &-price {
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
        @screen lg {
          @apply tw-hidden;
        }
      }
    }

    &-total-price {
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
        @screen lg {
          @apply tw-hidden;
        }
      }

      &__price {
        @screen lg {
          @apply tw-text-lg;
          @apply tw-leading-7;
          @apply tw-font-normal;
        }
      }
    }

    &-delete {
      @screen lg {
        @apply tw-mt-auto;
      }
    }

    &-details {
      @apply tw-col-start-1 tw-col-end-12;

      @screen lg {
        @apply tw-row-start-2 tw-row-end-3;
        @apply tw-col-start-2 tw-col-end-8;
        @apply tw-mt-0;
      }
    }

    &-promotion {
      @screen lg {
        @apply tw-row-start-3 tw-row-end-4;
        @apply tw-col-start-2 tw-col-end-13;
      }
    }

    &-add-article {
      @screen md {
        @apply tw-mx-0;
      }

      @screen lg {
        @apply tw-row-start-4 tw-row-end-5;
        @apply tw-col-start-2 tw-col-end-13;
      }
    }
  }
}
</style>
