<template>
  <div class="cart-item-wrapper">
    <div class="cart-item-header">
      <span class="cart-item-header__quantity">{{ $t('cart.quantity') }}</span>
      <span class="cart-item-header__price">
        {{ $t('cart.productPrice') }}
      </span>
      <span class="cart-item-header__totalPrice">
        {{ $t('cart.totalPrice') }}
      </span>
    </div>
    <div v-for="i in 6" :key="i" class="cart-item-card">
      <Link :href="url" class="cart-item-card-image">
        <ResponsiveImage
          :image="entry.product.images[0]"
          provider="hybris"
          aspect-ratio="1:1"
        />
      </Link>
      <div class="cart-item-card-title">
        <h2 class="cart-item-card-title__mainTitle">
          <Link :href="url">{{ entry.product.name }}</Link>
        </h2>
        <p class="cart-item-card-title__subTitle">
          {{ entry.product.orderNumber }}
        </p>
      </div>
      <div class="cart-item-card-tags">
        <span>Hello</span><span>Hello</span><span>Hello</span><span>Hello</span
        ><span>Hello</span><span>Hello</span>
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
        <span>{{ ` € ${productPrice}` }}</span>
      </div>
      <div class="cart-item-card-totalPrice">
        <span class="cart-item-card-totalPrice__label">{{
          $t('cart.totalPrice')
        }}</span>
        <span>{{ ` € ${totalPrice}` }}</span>
      </div>
      <Button
        class="cart-item-card-addArticle"
        variant="secondary"
        shape="plain"
        icon="assignment"
        :label="$t('cart.list.addArticle')"
        @click="$emit('addToList', ev)"
      />
      <Button
        class="cart-item-card-delete"
        variant="secondary"
        shape="plain"
        icon="delete"
        @click="$emit('delete', ev)"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import Link from '~/components/atoms/Link/Link'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

export default defineComponent({
  name: 'CartItemCard',
  components: {
    Button,
    Link,
    ResponsiveImage,
    PvInput,
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
  emits: ['addToList', 'delete'],
  setup(props) {
    const context = useContext()
    const quantity = ref(props.entry.quantity)
    const image = computed(() => props.entry.product.images[0])
    const productPrice = ref(props.price)

    console.log(props.entry.product.code, 'PATH')

    const url = computed(() =>
      context.app.localePath({
        name: 'shop-products-product',
        params: { product: props.entry.product?.code },
      })
    )

    const isInactive = computed(() => {
      return props.entry.product?.purchasable === false
    })

    const totalPrice = computed(() => {
      return quantity.value * productPrice.value
    })

    const updateQuantity = (value) => {
      if (value > 1) {
        quantity.value = value
      } else {
        quantity.value = 1
      }
    }

    return {
      quantity,
      image,
      isInactive,
      updateQuantity,
      url,
      productPrice,
      totalPrice,
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
  @apply tw-grid tw-grid-rows-5 tw-grid-cols-12;
  @apply tw-border-b tw-border-b-pv-grey-80;
  @apply tw-mt-6;

  @screen lg {
    @apply tw-grid-rows-3;
  }

  &-image {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-1 tw-col-end-1;

    @screen lg {
      @apply tw-row-start-1 tw-row-end-3;
    }
  }

  &-title {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-2 tw-col-end-11;
    @apply tw-text-base;
    @apply tw-leading-6;

    @screen lg {
      @apply tw-col-start-2 tw-col-end-8;
    }

    &__mainTitle {
      @screen lg {
        @apply tw-text-lg;
      }
    }

    &__subTitle {
      @apply tw-text-base;
      @apply tw-text-pv-grey-48;
    }
  }

  &-quantity {
    @apply tw-row-start-2 tw-row-end-3;
    @apply tw-col-start-1 tw-col-end-6;

    @screen lg {
      @apply tw-row-start-1 tw-row-end-1;
      @apply tw-col-start-9 tw-col-end-9;
      @apply tw-w-20;
    }
  }

  &-price {
    @apply tw-row-start-2 tw-row-end-2;
    @apply tw-col-start-7 tw-col-end-12;

    @screen lg {
      @apply tw-row-start-1 tw-row-end-1;
      @apply tw-col-start-10 tw-col-end-10;
      @apply tw-text-lg;
    }

    &__label {
      @apply tw-text-sm;
      @apply tw-leading-6;

      @screen lg {
        @apply tw-hidden;
      }
    }
  }

  &-totalPrice {
    @apply tw-row-start-2 tw-row-end-2;
    @apply tw-col-start-7 tw-col-end-12;
    @apply tw-text-sm;
    @apply tw-leading-6;
    @apply tw-mt-16;

    @screen md {
      @apply tw-row-start-2 tw-row-end-2;
      @apply tw-col-start-11 tw-col-end-11;
    }

    @screen lg {
      @apply tw-row-start-1 tw-row-end-1;
      @apply tw-text-lg;
    }

    &__label {
      @screen lg {
        @apply tw-hidden;
      }
    }
  }

  &-delete {
    @apply tw-row-start-1 tw-row-end-1;
    @apply tw-col-start-12 tw-col-end-12;
  }

  &-tags {
    @apply tw-row-start-3 tw-row-end-4;
    @apply tw-col-start-1 tw-col-end-12;

    @screen lg {
      @apply tw-row-start-2 tw-row-end-2;
      @apply tw-col-start-2 tw-col-end-8;
    }
  }

  &-addArticle {
    @apply tw-row-start-5 tw-row-end-5;
    @apply tw-col-start-1 tw-col-end-12;
    @apply tw-w-fit;

    @screen lg {
      @apply tw-row-start-3 tw-row-end-3;
      @apply tw-col-start-2 tw-col-end-12;
    }
  }
}
</style>
