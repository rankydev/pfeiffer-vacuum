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
              <!-- <Link :href="getUrl"> -->
              <Link :href="'#'">
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
                <!-- <Link :href="getUrl"> -->
                <Link :href="'#'">
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
            <span v-if="readOnly">
              {{ $t('cart.quantity') }}: {{ entry.quantity }}
            </span>
            <PvInput
              v-else
              v-model="quantity"
              input-type="number"
              class="cart-item-card__quantity-input"
              @input="updateQuantity"
            />
          </div>
          <div class="cart-item-card__prices">
            <div class="cart-item-card__prices--single-price">
              <span class="cart-item-card__prices--show-headline">{{
                $t('cart.productPrice')
              }}</span>
              <p>{{ ` € ${productPrice}` }}</p>
            </div>
            <div class="cart-item-card__prices--total-price">
              <span class="cart-item-card__prices--show-headline">{{
                $t('cart.totalPrice')
              }}</span>
              <p v-if="productPrice">{{ ` € ${totalPrice}` }}</p>
              <p v-else>{{ totalPrice }}</p>
            </div>
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
        <!-- 
      <template v-if="isApprovedUser">
        <div>
          <h6 v-if="entry.basePrice" class="sub">
            {{ entry.basePrice.formattedValue }}
          </h6>
          <h6 v-if="entry?.totalPrice">
            {{ entry?.totalPrice.formattedValue }}
          </h6>
        </div>
      </template>
      <div
        v-else-if="!loggedIn"
        class=""
      >
        <h6>
          {{ $t('login.loginToSeePrices.part1') }}
          <span
            class="login-modal-link font-italic"
            @click="login()"
            v-html="$t('login.loginToSeePrices.part2')"
          >
          </span>
          {{ $t('login.loginToSeePrices.part3') }}
        </h6>
      </div>
    </di> -->
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
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
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
      required: true,
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
  setup(props, { emit }) {
    const userStore = useUserStore()
    const {
      isApprovedUser,
      isLeadUser,
      isOpenUser,
      isRejectedUser,
      isLoggedIn,
    } = storeToRefs(userStore)

    const currentUser = ref(true)
    const loggedIn = ref(isLoggedIn)
    const isOciUser = ref(true)

    const cartEntry = ref(props.entry)
    const quantity = ref(props.entry.quantity)
    const image = computed(() => props.entry.product.images[0])
    const productPrice = ref(props.price)

    // const getUrl = () => {
    //   context.app.localePath({
    //     name: 'shop-categories',
    //     params: { product: props.entry.product.code },
    //   })
    // }

    const userStatusType = computed(() => {
      return (
        (isLeadUser && 'lead') ||
        (isOpenUser && 'open') ||
        (isRejectedUser && 'rejected')
      )
    })

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

    const login = async () => {
      console.log('store functionality')
    }

    return {
      cartEntry,
      quantity,
      image,
      userStatusType,
      isInactive,
      updateQuantity,
      login,
      currentUser,
      loggedIn,
      isLeadUser,
      isOpenUser,
      isRejectedUser,
      isApprovedUser,
      isOciUser,
      productPrice,
      totalPrice,
    }
  },
})
</script>

<style lang="scss" scoped>
.cart-item-card {
  @apply tw-py-6;
  @apply tw-px-2;

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
      @apply tw-ml-2;
      @apply tw-mt-0;
    }
  }

  &__quantity {
    max-width: 200px;

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
        @apply tw-mr-2;
        @apply tw-text-xs;
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
    @apply tw-flex;
    @apply tw-justify-between;
  }

  .cart-item-card {
    &__content-wrapper {
      &--first-row {
        @apply tw-flex;
        @apply tw-flex-col;

        @screen lg {
          @apply tw-flex-row;
          @apply tw-justify-between;
        }
      }
    }

    &__product-delete {
      @apply tw-flex;
      @apply tw-justify-between;
    }

    &__product {
      @apply tw-flex;
    }

    &__quantity {
      @screen lg {
        width: 64px;
      }
    }

    &__prices {
      @screen lg {
        width: 85%;
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
        @apply tw-flex;
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
