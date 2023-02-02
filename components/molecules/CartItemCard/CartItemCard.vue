<template>
  <div
    v-if="entry.product"
    class="cart-item-card"
    :class="[
      isMinicart
        ? 'cart-item-card--minicart tw-bg-pv-white'
        : 'cart-item-card--desktop ',
    ]"
  >
    <div class="cart-item-card__content-wrapper">
      <div class="cart-item-card__content-wrapper--first-row">
        <div class="cart-item-card__product-delete">
          <div class="cart-item-card__product">
            <div class="cart-item-card__image">
              <Link :href="url">
                <ResponsiveImage
                  class="cart-item-card__product-image"
                  :image="entry.product.images[0]"
                  provider="hybris"
                  aspect-ratio="1:1"
                />
              </Link>
            </div>
            <div class="cart-item-card__product-code">
              <h6>
                <Link :href="url">
                  {{ entry.product.name }}
                </Link>
              </h6>
              <p class="cart-item-card__product-order-number">
                {{ entry.product.orderNumber }}
              </p>
            </div>
          </div>
          <div
            class="cart-item-card__delete-wrapper cart-item-card__delete-mobile"
          >
            <div class="cart-item-card__delete">
              <Button
                variant="secondary"
                shape="plain"
                icon="delete"
                @click="$emit('delete', ev)"
              />
            </div>
          </div>
        </div>
        <div class="cart-item-card__quantity-price">
          <div class="cart-item-card__quantity">
            <div
              v-if="readOnly"
              class="cart-item-card__quantity--read-only cart-item-card__prices--single-price"
            >
              <span class="cart-item-card__prices--show-headline">{{
                `${$t('cart.quantity')}: `
              }}</span>
              <p>{{ entry.quantity }}</p>
            </div>
            <PvInput
              v-else
              v-model="quantity"
              input-type="number"
              class="cart-item-card__quantity-input"
              @input="updateQuantity"
            />
          </div>
          <div class="cart-item-card__prices">
            <div
              v-if="productPrice && showPrice"
              class="cart-item-card__prices--single-price"
            >
              <span class="cart-item-card__prices--show-headline">{{
                $t('cart.productPrice')
              }}</span>
              <p>{{ ` € ${productPrice}` }}</p>
            </div>
            <div
              v-if="!productPrice && showPrice"
              class="cart-item-card__prices--single-price"
            >
              <p>-</p>
            </div>
            <div
              v-if="productPrice && showPrice"
              class="cart-item-card__prices--total-price"
            >
              <span class="cart-item-card__prices--show-headline">{{
                $t('cart.totalPrice')
              }}</span>
              <p>{{ ` € ${totalPrice}` }}</p>
            </div>
            <div
              v-if="!productPrice && showPrice"
              class="cart-item-card__prices--single-price"
            >
              <p>-</p>
            </div>
          </div>
          <div
            v-if="!showPrice"
            class="cart-item-card__prices--price-on-request"
          >
            <span>{{ $t('cart.priceOnRequest') }}</span>
          </div>
        </div>
      </div>
      <div class="cart-item-card___content-wrapper--second-row">
        <div class="cart-item-card__attribute-wrapper">
          <div
            v-if="showAttributes"
            class="cart-item-card__variation-attributes-row"
          >
            <div
              v-for="(attribute, attributeIndex) in entry.product
                .variationMatrix.variationAttributes"
              :key="attributeIndex"
              class="cart-item-card__variation-attributes"
            >
              <div
                v-for="(
                  attributeEntry, subindex
                ) in attribute.variationValues.filter((e) => e.selected)"
                :key="String(attributeIndex) + String(subindex)"
                class="cart-item-card__attribute"
              >
                <div class="cart-item-card__attribute-value">
                  <span class="cart-item-card__attribute-name">{{
                    `${attribute.name}: `
                  }}</span>
                  <span>{{ attributeEntry.displayValue }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cart-item-card__promotions-wrapper">
          <div class="cart-item-card__promotions">
            <div
              v-for="(promo, x) in promotions"
              :key="x"
              class="cart-item-card__promotion"
            >
              {{ promo.description }}
            </div>
          </div>
        </div>
        <div class="cart-item-card__further-article-information">
          <div class="cart-item-card__add-to-other-list">
            <Button
              class="cart-item-card__add-to-other-list-btn"
              variant="secondary"
              shape="plain"
              icon="assignment"
              :label="$t('cart.list.addArticle')"
              @click="$emit('addToList', ev)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="cart-item-card__delete-wrapper cart-item-card__delete-desktop">
      <div class="cart-item-card__delete">
        <Button
          variant="secondary"
          shape="plain"
          icon="delete"
          @click="$emit('delete', ev)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
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

<style lang="scss" scoped>
.cart-item-card {
  @apply tw-py-12;
  @apply tw-px-6;

  &__content-wrapper {
    &--first-row {
      @apply tw-flex-row;
    }

    &--second-row {
      @apply tw-flex tw-flex-col;
    }
  }

  &__quantity-price {
    @apply tw-flex;
    @apply tw-justify-between;
    @apply tw-mt-4;

    @screen lg {
      @apply tw-ml-8;
      @apply tw-mt-0;
    }
  }

  &__quantity {
    @screen lg {
      @apply tw-mr-12;
      max-width: 64px;
    }
  }

  &__image {
    @apply tw-inline-flex;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-mr-4;
    max-width: 48px;
  }

  &__prices {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-justify-end;
    @apply tw-items-center;

    @screen md {
      @apply tw-flex-row;
      @apply tw-ml-12;
    }

    &--show-headline {
      display: block;

      @screen lg {
        @apply tw-hidden;
      }
    }

    &--single-price {
      @apply tw-flex;
      @apply tw-items-center;

      span {
        @apply tw-text-xs;
        @apply tw-mr-2;
        @apply tw-text-pv-grey-48;
      }

      p {
        @apply tw-text-base;

        @screen lg {
          @apply tw-text-xl;
        }
      }

      @screen md {
        @apply tw-mr-12;
      }
    }

    &--total-price {
      @apply tw-flex;
      @apply tw-items-center;

      span {
        @apply tw-mr-2;
        @apply tw-text-xs;
        @apply tw-text-pv-grey-48;
      }

      p {
        @apply tw-font-bold;
        @apply tw-text-base;

        @screen lg {
          @apply tw-font-normal;
          @apply tw-text-xl;
        }
      }
    }

    &--price-on-request {
      @apply tw-flex;
      @apply tw-items-center;
      @apply tw-font-bold;
      @apply tw-text-base;
      @apply tw-ml-4;
      @apply tw-text-right;
    }
  }

  &__variation-attributes-row {
    @apply tw-flex tw-flex-wrap;
  }

  &__attribute {
    @apply tw-flex;
    @apply tw-mb-2;
  }

  &__attribute-value {
    @apply tw-bg-pv-grey-96;
    @apply tw-text-xs;
    @apply tw-px-2;
    @apply tw-py-1;
    @apply tw-mt-2;
    @apply tw-mr-2;
    @apply tw-rounded-md;
  }

  &__attribute-name {
    @apply tw-text-pv-grey-64;
  }

  &__promotions {
    @apply tw-flex;
    @apply tw-flex-wrap;
  }

  &__promotion {
    @apply tw-bg-pv-grey-16;
    @apply tw-text-pv-white;
    @apply tw-rounded-md;
    @apply tw-font-bold;
    @apply tw-text-sm;
    @apply tw-px-2;
    @apply tw-py-1;
    @apply tw-mt-2;
    @apply tw-mr-2;
  }
}

.cart-item-card--minicart {
  @apply tw-flex tw-flex-row;

  .cart-item-card {
    &__content-wrapper {
      @apply tw-w-full;

      &--first-row {
        @apply tw-flex tw-flex-col;
      }
    }

    &__delete-mobile {
      @apply tw-flex;
    }

    &__delete-desktop {
      @apply tw-hidden;
    }

    &__product-delete {
      @apply tw-flex;
      @apply tw-justify-between;
    }

    &__product {
      @apply tw-flex;
    }

    &__prices {
      @apply tw-items-center;
    }
  }
}

.cart-item-card--desktop {
  background-color: white;

  @screen lg {
    @apply tw-grid tw-grid-cols-12;
  }

  .cart-item-card {
    &__content-wrapper {
      @screen lg {
        @apply tw-col-span-11;
      }

      &--first-row {
        @apply tw-flex;
        @apply tw-flex-col;

        @screen lg {
          @apply tw-grid tw-col-span-11;
        }
      }

      &--second-row {
        @screen lg {
          @apply tw-grid tw-col-span-12;
        }
      }
    }

    &__product-delete {
      @apply tw-flex;
      @apply tw-justify-between;

      @screen lg {
        @apply tw-col-span-8;
      }
    }

    &__quantity-price {
      @screen lg {
        @apply tw-col-span-3;
        @apply tw-col-start-9;
        @apply tw-ml-0;
      }
    }

    &__product {
      @apply tw-flex;
    }

    &__quantity {
      @screen lg {
        @apply tw-col-span-1;
        @apply tw-col-start-9;
        @apply tw-mr-0;
      }
    }

    &__prices {
      @screen lg {
        @apply tw-col-span-2;
        @apply tw-col-start-10;
        @apply tw-ml-0;
      }
    }

    &__delete-mobile {
      @apply tw-flex;

      @screen lg {
        @apply tw-hidden;
      }
    }

    &__delete-desktop {
      @apply tw-hidden;

      @screen lg {
        @apply tw-col-span-1;
        @apply tw-col-start-12;
        @apply tw-flex;
        @apply tw-flex-col;
        @apply tw-items-end;
      }
    }

    &__attribute-wrapper {
      @apply tw-mt-4;
    }

    &__further-article-information {
      @apply tw-mt-6;
    }

    &__add-to-other-list {
      @apply tw-flex;
    }
  }
}
</style>
