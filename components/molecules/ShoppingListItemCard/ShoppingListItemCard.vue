<template>
  <div class="shopping-list-item-card">
    <div v-if="productImage" class="shopping-list-item-card__image">
      <Link :href="url">
        <ResponsiveImage
          :image="productImage"
          provider="hybris"
          :mode-full="true"
          :contain-image="true"
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
        <template v-for="(variant, id) in detail.variationValues">
          <Tag
            v-if="variant.selected"
            :key="detail.code + id"
            class="shopping-list-item-card__details__detail"
            :label="detail.name"
            :content="variant.displayValue"
          />
        </template>
      </template>
    </div>
    <PromotionLabel
      v-if="promotion"
      class="shopping-list-item-card__promotion"
      :subline="getPromotion"
    />
    <div
      class="shopping-list-item-card__quantity"
      :class="{ 'shopping-list-item-card__quantity__read-only': isReadOnly }"
    >
      <div
        v-if="isReadOnly"
        class="shopping-list-item-card__quantity__read-only__wrapper"
      >
        <span
          class="shopping-list-item-card__quantity__read-only__wrapper__label"
        >
          {{ $t('cart.quantity') }}
        </span>
        <span
          class="shopping-list-item-card__quantity__read-only__wrapper__quantity"
        >
          {{ quantity }}
        </span>
      </div>
      <PvInput
        v-else
        v-model="quantityModel"
        input-type="number"
        :disabled="isInactive"
        @input="updateQuantity"
      />
    </div>
    <div
      v-if="!isLoggedIn || !isPriceVisible"
      class="shopping-list-item-card__price-error"
      :class="{ 'shopping-list-item-card__price-error__read-only': isReadOnly }"
    >
      <LoginToSeePricesLabel v-if="!isLoggedIn" />
      <span v-else>{{ noPriceReason }}</span>
    </div>
    <div
      v-if="isLoggedIn && isPriceVisible"
      class="shopping-list-item-card__price"
      :class="{ 'shopping-list-item-card__price__read-only': isReadOnly }"
    >
      <span class="shopping-list-item-card__price__label">
        {{ $t('cart.productPrice') }}
      </span>
      <span class="shopping-list-item-card__price__price">
        {{ productPrice }}
      </span>
    </div>
    <div
      v-if="isReadOnly && isLoggedIn && isPriceVisible"
      class="shopping-list-item-card__total-price"
    >
      <span class="shopping-list-item-card__total-price__label">
        {{ $t('cart.overall1') }}
      </span>
      <span class="shopping-list-item-card__total-price__price">
        {{ totalPrice }}
      </span>
    </div>
    <Button
      v-if="!isReadOnly"
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
        :label="
          isReadOnly
            ? $t('cart.list.addArticle')
            : $t('cart.list.addToAnotherList')
        "
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
// Add to Lsg if its possible
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
import Tag from '~/components/atoms/Tag/Tag'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useDebounceFn } from '@vueuse/core'
import { useCartStore } from '~/stores/cart'

export default defineComponent({
  name: 'ShoppingListItemCard',
  components: {
    Button,
    Link,
    PvInput,
    Tag,
    ResponsiveImage,
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
    priceTotal: {
      type: Object,
      default: null,
      required: false,
    },
    quantity: {
      type: Number,
      default: 1,
      required: false,
    },
    isReadOnly: {
      type: Boolean,
      default: false,
      required: false,
    },
    promotion: {
      type: Object,
      default: null,
      required: false,
    },
  },
  emits: ['addToShoppingList', 'delete', 'update'],
  setup(props, { emit }) {
    const { app, i18n } = useContext()
    const userStore = useUserStore()
    const cartStore = useCartStore()
    const { basePrice, quantity, product, promotion } = toRefs(props)
    const quantityModel = ref(quantity?.value)
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
      if (!basePrice.value) return i18n?.t('product.priceOnRequest')
      if (isLeadUser.value) return i18n?.t(path + 'lead')
      if (isOpenUser.value) return i18n?.t(path + 'open')
      if (isRejectedUser.value) return i18n?.t(path + 'rejected')
      return i18n?.t('product.noPriceAvailable')
    })

    const isPriceVisible = computed(
      () => !!(basePrice?.value && isApprovedUser?.value)
    )

    const getPriceString = (priceValue) => {
      if (!basePrice?.value || !priceValue) {
        return '-'
      }
      return priceValue
    }

    const productPrice = computed(() => {
      return getPriceString(basePrice?.value?.formattedValue)
    })

    const totalPrice = computed(() => props.priceTotal?.formattedValue || '')

    const productImage = computed(() => {
      return product?.value?.images?.[0] || null
    })

    const productName = computed(() => {
      return product?.value?.name || ''
    })

    const orderNumber = computed(() => {
      return product?.value?.orderNumber || ''
    })

    const details = computed(
      () => product?.value?.variationMatrix?.variationAttributes
    )

    const getPromotion = computed(() => {
      return promotion.value?.description
    })

    const addToShoppingList = () => {
      emit('addToShoppingList', {
        ...product?.value,
        quantity: quantityModel?.value,
      })
    }
    const deleteFromCart = () => {
      emit('delete', { ...product?.value, quantity: quantityModel?.value })
    }

    const addToCart = async () => {
      await addProductToCart(product?.value?.code, quantityModel?.value)
      cartStore.toggleCartOverlay()
    }

    const updateCartQuantity = useDebounceFn(() => {
      emit('update', { ...product?.value, quantity: quantityModel?.value })
    }, 500)

    const url = computed(() =>
      app.localePath({
        name: 'shop-products-product',
        params: { product: product?.value?.code },
      })
    )
    const isInactive = computed(() => {
      return product?.value?.purchasable === false
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
      totalPrice,
      getPromotion,
    }
  },
})
</script>

<style lang="scss">
.shopping-list-item-card {
  @apply tw-grid tw-grid-cols-12 tw-auto-rows-auto;
  @apply tw-border-b tw-border-b-pv-grey-80;
  @apply tw-mt-4;

  @screen lg {
    @apply tw-mt-6;
  }

  &__image {
    @apply tw-row-start-1 tw-row-end-2;
    @apply tw-col-start-1 tw-col-end-4;
    @apply tw-flex;
    height: 80px;

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
      @apply tw-col-start-8 tw-col-end-10;
      @apply tw-w-20;
      @apply tw-my-auto;
      @apply tw-ml-auto;
      @apply tw-mr-2;
    }

    &__read-only {
      @apply tw-flex;

      @screen lg {
        @apply tw-col-start-8 tw-col-end-9;
        @apply tw-ml-auto;
        @apply tw-mr-8;
      }

      &__wrapper {
        @apply tw-flex;

        @screen lg {
          @apply tw-ml-auto;
        }

        &__label {
          @apply tw-text-xs;
          @apply tw-text-pv-grey-48;
          @apply tw-mt-1;

          @screen lg {
            @apply tw-hidden;
          }
        }

        &__quantity {
          @apply tw-ml-2;

          @screen lg {
            @apply tw-ml-auto;
            @apply tw-text-lg;
          }
        }
      }
    }
  }

  &__price-error {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-5 tw-col-end-13;
    @apply tw-flex;
    @apply tw-mt-4;

    @screen lg {
      @apply tw-row-start-1 tw-row-end-2;
      @apply tw-col-start-11 tw-col-end-12;
      @apply tw-my-auto;
      @apply tw-ml-4;
    }

    .login-to-see-prices-label {
      text-align: end;
      @apply tw-my-auto;
      @apply tw-ml-auto;

      @screen lg {
        @apply tw-text-center;
      }
    }

    &__read-only {
      @screen lg {
        @apply tw-col-start-11 tw-col-end-13;
        @apply tw-m-auto;
      }
    }
  }

  &__price {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-5 tw-col-end-13;
    @apply tw-leading-6;
    @apply tw-flex;
    @apply tw-ml-auto;
    @apply tw-mt-4;
    @apply tw-items-center;

    @screen md {
      @apply tw-my-auto;
      @apply tw-items-end;
    }

    @screen lg {
      @apply tw-row-start-1 tw-row-end-1;
      @apply tw-col-start-10 tw-col-end-12;
      @apply tw-text-lg;
      @apply tw-leading-7;
      @apply tw-m-auto;
      @apply tw-items-center;
    }

    &__label {
      @apply tw-text-xs;
      @apply tw-ml-2;
      @apply tw-text-pv-grey-48;

      @screen lg {
        @apply tw-hidden;
      }
    }

    &__price {
      @apply tw-ml-2;
    }

    &__read-only {
      @apply tw-mt-4;
      @apply tw-mb-6;

      @screen md {
        @apply tw-col-start-5 tw-col-end-10;
        @apply tw-mt-0;
        @apply tw-mb-0;
      }

      @screen lg {
        @apply tw-col-start-9 tw-col-end-11;
      }
    }
  }

  &__total-price {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-5 tw-col-end-13;
    @apply tw-leading-6;
    @apply tw-flex;
    @apply tw-mt-auto;
    @apply tw-ml-auto;

    @screen lg {
      @apply tw-row-start-1 tw-row-end-1;
      @apply tw-col-start-11 tw-col-end-13;
      @apply tw-my-auto;
    }

    &__label {
      @apply tw-text-xs;
      @apply tw-text-pv-grey-48;

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
        @apply tw-font-normal;
      }
    }
  }

  &__delete {
    @apply tw-row-start-1 tw-row-end-2;
    @apply tw-col-start-12 tw-col-end-13;
    @apply tw-mb-auto;
    @apply tw-ml-auto;
    padding: 0 !important;

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
      @apply tw-col-start-2 tw-col-end-11;
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
    @apply tw-row-start-5 tw-row-end-6;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-flex tw-flex-col;
    @apply tw-py-4;

    @screen md {
      @apply tw-row-start-5 tw-row-end-6;
      @apply tw-flex-row;
    }

    @screen lg {
      @apply tw-row-start-4 tw-row-end-5;
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

  &__promotion {
    @apply tw-row-start-4 tw-row-end-5;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-w-fit;
    @apply tw-h-fit;
    @apply tw-mt-4;
    @apply tw-py-1;

    @screen lg {
      @apply tw-row-start-3 tw-row-end-4;
      @apply tw-col-start-2 tw-col-end-13;
    }
  }
}
</style>
