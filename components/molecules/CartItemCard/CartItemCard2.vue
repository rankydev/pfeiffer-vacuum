<template>
  <div class="cart-item-wrapper">
    <div
      v-for="i in 6"
      :key="i"
      class="cart-item-card"
      :class="{ 'cart-item-card-desktop': !isMinicart }"
    >
      <div class="cart-item-card-image">
        <Link :href="url">
          <ResponsiveImage
            :image="productImage"
            provider="hybris"
            aspect-ratio="1:1"
          />
        </Link>
      </div>
      <div class="cart-item-card-title">
        <h2 class="cart-item-card-title__mainTitle">
          <Link :href="url">{{ productName }}</Link>
        </h2>
        <p class="cart-item-card-title__subTitle">
          {{ orderNumber }}
        </p>
      </div>
      <div class="cart-item-card-details">
        <Button
          class="cart-item-card-details__expandButton"
          variant="secondary"
          shape="plain"
          :icon="isDetailsExpanded ? 'arrow_upward' : 'arrow_downward'"
          :label="$t('cart.details')"
          @click="toggleDetails"
        />
        <div v-if="isDetailsExpanded">
          <template v-for="detail in details">
            <Badge
              v-for="(variant, id) in detail.variationValues"
              :key="detail.code + id"
              class="cart-item-card-details__detail"
              :label="detail.name"
              :content="variant.displayValue"
            />
          </template>
        </div>
      </div>
      <PvInput
        v-model="quantity"
        input-type="number"
        class="cart-item-card-quantity"
        @input="updateQuantity"
      />
      <div class="cart-item-card-price">
        <span class="cart-item-card-price__label">
          {{ $t('cart.productPrice') }}
        </span>
        <span class="cart-item-card-price__price">{{
          `€ ${productPrice}`
        }}</span>
      </div>
      <div class="cart-item-card-totalPrice">
        <span class="cart-item-card-totalPrice__label">
          {{ $t('cart.totalPrice') }}
        </span>
        <span class="cart-item-card-totalPrice__price">
          {{ `€ ${totalPrice}` }}
        </span>
      </div>
      <Button
        class="cart-item-card-addArticle"
        variant="secondary"
        shape="plain"
        icon="assignment"
        :label="$t('cart.list.addArticle')"
        @click="addToList"
      />
      <Button
        class="cart-item-card-delete"
        variant="secondary"
        shape="plain"
        icon="delete"
        @click="deleteFromList"
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
import Badge from '~/components/molecules/Badge/Badge'

export default defineComponent({
  name: 'CartItemCard',
  components: {
    Button,
    Link,
    ResponsiveImage,
    PvInput,
    Badge,
  },
  props: {
    entry: {
      type: Object,
      required: true,
    },
    price: {
      type: Number,
      default: null,
    },
    showPrice: {
      type: Boolean,
      default: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    showAttributes: {
      type: Boolean,
      default: true,
    },
    promotions: {
      type: Array,
      default: () => [],
    },
    isMinicart: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['add', 'delete'],
  setup(props, { emit }) {
    const context = useContext()
    const { entry, price, isMinicart } = toRefs(props)
    const quantity = ref(entry.value.quantity)
    const productPrice = ref(price.value)
    //works and tested
    const productImage = computed(() => {
      return entry.value.product.images[0]
    })
    const productName = computed(() => {
      return entry.value.product.name
    })
    const orderNumber = computed(() => {
      return entry.value.product.orderNumber
    })
    const details = computed(
      () => props.entry?.product?.variationMatrix?.variationAttributes
    )
    const isDetailsExpanded = ref(!isMinicart.value)
    const toggleDetails = () => {
      isDetailsExpanded.value = !isDetailsExpanded.value
    }
    const addToList = () => {
      emit('add', entry.value)
    }
    const deleteFromList = () => {
      emit('delete', entry.value)
    }
    // end

    console.log(entry.value.product.code, 'PATH')

    const url = computed(() =>
      context.app.localePath({
        name: 'shop-products-product',
        params: { product: entry.value?.product?.code },
      })
    )

    const isInactive = computed(() => {
      return entry.value.product?.purchasable === false
    })

    const totalPrice = computed(() => quantity.value * productPrice.value)

    const updateQuantity = (value) => {
      if (value > 1) {
        quantity.value = value
      } else {
        quantity.value = 1
      }
    }

    return {
      quantity,
      isInactive,
      updateQuantity,
      url,
      productPrice,
      totalPrice,
      details,
      isDetailsExpanded,
      toggleDetails,
      productImage,
      addToList,
      deleteFromList,
      productName,
      orderNumber,
    }
  },
})
</script>

<style lang="scss">
.cart-item-header {
  @apply tw-grid tw-grid-rows-1 tw-grid-cols-12;
  @apply tw-mx-4;

  &__quantity {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-9 tw-col-end-9;
  }

  &__price {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-10 tw-col-end-10;
  }

  &__totalPrice {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-11 tw-col-end-11;
  }
}

.cart-item-card {
  @apply tw-grid tw-grid-cols-12 tw-auto-rows-auto;
  @apply tw-border-b tw-border-b-pv-grey-80;
  @apply tw-mt-6;
  @apply tw-mx-4;

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

    &__mainTitle {
      @apply tw-text-base;
      @apply tw-leading-6;
    }

    &__subTitle {
      @apply tw-text-base;
      @apply tw-text-pv-grey-48;
    }
  }

  &-quantity {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-1 tw-col-end-7;
    @apply tw-mt-4;
    @apply tw-flex;
  }

  &-price {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-7 tw-col-end-13;
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

  &-totalPrice {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-7 tw-col-end-13;
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
    padding: 0 0 0 8px !important;
  }

  &-details {
    @apply tw-row-start-3 tw-row-end-4;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-flex tw-flex-wrap;
    @apply tw-mt-4;

    &__expandButton {
      @apply tw-mx-auto;
    }

    &__detail {
      @apply tw-mr-2;
      @apply tw-mb-2;

      &:last-child {
        @apply tw-mr-0;
      }
    }
  }

  &-addArticle {
    @apply tw-row-start-5 tw-row-end-6;
    @apply tw-col-start-1 tw-col-end-13;
    @apply tw-w-fit;
    @apply tw-mx-auto;
    @apply tw-mb-3;
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
    }

    &-title {
      @screen md {
        @apply tw-col-start-2;
      }

      @screen lg {
        @apply tw-ml-0;
        @apply tw-col-start-2 tw-col-end-8;
      }

      &__mainTitle {
        @screen lg {
          @apply tw-text-lg;
          @apply tw-leading-7;
        }
      }
    }

    &-quantity {
      @screen lg {
        @apply tw-row-start-1 tw-row-end-1;
        @apply tw-col-start-9 tw-col-end-10;
        @apply tw-w-20;
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
      }

      &__label {
        @screen lg {
          @apply tw-hidden;
        }
      }
    }

    &-totalPrice {
      @screen md {
        @apply tw-mb-auto;
        @apply tw-col-start-11 tw-col-end-13;
      }

      @screen lg {
        @apply tw-row-start-1 tw-row-end-2;
        @apply tw-col-start-11 tw-col-end-12;
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
        @apply tw-mr-auto;
      }
    }

    &-details {
      @apply tw-col-start-1 tw-col-end-12;

      @screen lg {
        @apply tw-row-start-2 tw-row-end-3;
        @apply tw-col-start-2 tw-col-end-8;
      }
    }

    &-addArticle {
      @screen md {
        @apply tw-mx-0;
      }

      @screen lg {
        @apply tw-row-start-3 tw-row-end-4;
        @apply tw-col-start-2 tw-col-end-13;
      }
    }
  }
}
</style>
