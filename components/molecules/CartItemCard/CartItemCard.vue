<template>
  <div v-if="entry.product" class="cart-item-card tw-container tw-bg-pv-white">
    <div class="cart-item-card__wrapper">
      <div class="cart-item-card__image">
        <Link :href="getUrl">
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
          <Link :href="getUrl">
            {{ entry.product.name }}
          </Link>
        </h6>
        <p class="cart-item-card__product-order-number">
          {{ entry.product.orderNumber }}
        </p>
      </div>
      <div class="cart-item-card__quanity">
        <span v-if="readOnly">
          {{ $t('cart.quantity') }}: {{ entry.quantity }}
        </span>
        <PvInput
          v-else
          v-model="quantity"
          input-type="number"
          class="cart-item-card__quanity-input"
          @input="updateQuantity()"
        />
      </div>
      <div class="cart-item-card__prices">
        <p>{{ productPrice }}</p>
        <p v-if="productPrice">{{ `${productPrice * quantity}` }}</p>
        <p v-else>{{ productPrice }}</p>
      </div>
      <div class="cart-item-card__delete">
        <Button variant="secondary" shape="plain" icon="delete" />
      </div>
    </div>
    <div class="tw-grid tw-grid-cols-12 tw-mt-4">
      <div
        v-if="showAttributes"
        class="variation-attributes-wrapper tw-flex tw-flex-wrap tw-col-start-2 tw-col-span-6"
      >
        <!-- Hier graue Tags anzeigen -->
        <div
          v-for="(attribute, attributeIndex) in entry.product.variationMatrix
            .variationAttributes"
          :key="attributeIndex"
          class="cart-item-card__attributes tw-flex"
        >
          <div
            v-for="(
              attributeEntry, subindex
            ) in attribute.variationValues.filter((e) => e.selected)"
            :key="String(attributeIndex) + String(subindex)"
            class="cart-item-card__attribute tw-flex tw-mb-2"
          >
            <div
              class="cart-item-card__attribute-value tw-bg-pv-grey-96 tw-text-xs tw-px-2 tw-py-1 tw-mr-2 tw-rounded-md"
            >
              <!-- <span class="tw-text-pv-grey-64">{{ `Käse: ` }}</span>
              <span>{{ 'Salami' }}</span> -->
              <span class="tw-text-pv-grey-64">{{
                `${attribute.name}: `
              }}</span>
              <span>{{ attributeEntry.displayValue }}</span>
            </div>
          </div>
        </div>
        <!-- <template
        v-for="(attribute, attributeIndex) in (
          entry.product.variationMatrix || {}
        ).variationAttributes || []"
      >
        <template
          v-for="(attributeEntry, subindex) in attribute.variationValues.filter(
            (e) => e.selected
          )"
          :key="String(attributeIndex) + String(subindex)"
        >
          <p class="variation-attribute">
            {{ attribute.name }}:
            <span>{{ attributeEntry.value }}</span>
          </p>
        </template>
      </template> -->
      </div>
    </div>

    <div class="cart-item-card__promotions tw-grid tw-grid-cols-12">
      <div class="lg:tw-col-start-2 tw-col-span-6 tw-flex tw-mt-2">
        <div
          v-for="(promo, x) in promotions"
          :key="x"
          class="cart-item-card__promotion"
        >
          {{ promo.description }}
        </div>
      </div>
    </div>
    <!-- <di v class="cart-item-card__promotions__price-row price-row">
      <div class="tw-col-span-5 md:tw-col-span-4 lg:tw-col-span-2 tw-pr-3">
        <span v-if="readOnly">
          {{ $t('cart.quantity') }}: {{ entry.quantity }}
        </span>
        <PvInput
          v-else
          v-model="quantity"
          input-type="number"
          class="quantity"
          @input="updateQuantity()"
        />
      </div>
      <div
        v-if="isApprovedUser && !isPriceAvailable"
        class="tw-col-span-7 md:tw-col-span-8 lg:tw-col-span-10 tw-flex tw-justify-end tw-items-center"
      >
        price-on-request__empty
        <span
          :class="`price-on-request${
            unavailablePriceState === '-' ? '__empty' : ''
          }`"
        >
          {{ unavailablePriceState }}
        </span>
      </div>
      <template v-else-if="isApprovedUser">
        <div class="tw-col-span-7 md:tw-col-span-8 lg:tw-col-span-10 price">
          <h6 v-if="entry.basePrice" class="sub">
            {{ entry.basePrice.formattedValue }}
          </h6>
          <h6 v-if="entry?.totalPrice">
            {{ entry?.totalPrice.formattedValue }}
          </h6>
        </div>
      </template>
      <div
        v-else-if="loggedIn"
        class="tw-col-span-7 md:tw-col-span-8 lg:tw-col-span-10 tw-flex tw-justify-end tw-items-center"
      >
        <i18n :path="`userStatus.${userStatusType}.priceInfo.text`" tag="h6">
          <template #link>
            <Link
              class="tw-text-pv-red tw-italic"
              :href="localePath('shop-my-account-account-data')"
            >
              {{ $t(`userStatus.${userStatusType}.priceInfo.link`) }}
            </Link>
          </template>
        </i18n>
      </div>
      <div
        v-else-if="!loggedIn"
        class="tw-col-span-7 md:tw-col-span-8 lg:tw-col-span-10 tw-flex tw-justify-end tw-items-center"
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
    <!-- <div v-if="currentUser && !isOciUser" class="further-article-information"> -->
    <div
      class="cart-item-card__further-article-information tw-grid tw-grid-cols-12"
    >
      <div class="tw-col-start-2 tw-col-span-2">
        <Button
          class="add-to-other-list"
          variant="secondary"
          shape="plain"
          icon="assignment"
          :label="$t('list.addArticle')"
          @click="addToOtherList(entry.product)"
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
import { useUserStore } from '~/stores/user'
import { useProductStore } from '~/stores/product'
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
  },
  // emits: ['input'],
  setup(props, { emit }) {
    const context = useContext()
    const { i18n } = useContext()
    const userStore = useUserStore()
    const productStore = useProductStore()
    const { product, productType, price } = storeToRefs(productStore)
    const {
      isApprovedUser,
      isLeadUser,
      isOpenUser,
      isRejectedUser,
      isLoggedIn,
    } = storeToRefs(userStore)

    console.log(props.entry.product.variationMatrix, 'PRODUCT')

    const currentUser = ref(true)
    const loggedIn = ref(isLoggedIn)
    const isOciUser = ref(true)

    const cartEntry = ref(props.entry)
    const quantity = ref(props.entry.quantity)
    const image = computed(() => props.entry.product.images[0])

    const url = computed(() =>
      context.app.localePath({
        name: 'shop-categories',
        params: { product: props.entry.product.code },
      })
    )

    const getUrl = () => {
      context.app.localePath({
        name: 'shop-categories',
        params: { product: props.entry.product.code },
      })
    }

    const userStatusType = computed(() => {
      return (
        (isLeadUser && 'lead') ||
        (isOpenUser && 'open') ||
        (isRejectedUser && 'rejected')
      )
    })

    const noPriceReason = computed(() => {
      const path = 'product.login.loginToSeePrices.'
      if (isLeadUser.value) return i18n.t(path + 'lead')
      if (isOpenUser.value) return i18n.t(path + 'open')
      if (isRejectedUser.value) return i18n.t(path + 'rejected')
      return i18n.t('product.noPriceAvailable')
    })

    const hasCustomerPrice = computed(() => !!price.value?.customerPrice)

    const productPrice = computed(() =>
      price.value
        ? price.value?.formattedValue || ''
        : i18n.t('product.priceOnRequest')
    )

    const isPriceVisible = computed(
      () => !!(price.value && isApprovedUser.value)
    )

    const isInactive = computed(() => {
      // return props.entry.product?.purchasable === false
      return false
    })

    const isPriceAvailable = computed(() => {
      return true
      // return !!(
      //   loggedIn &&
      //   props.entry.product?.purchasable !== false &&
      //   props.entry.product?.totalPrice
      // )
    })

    const unavailablePriceState = computed(() => {
      // if (props.entry.product?.purchasable === false) {
      //   return $t('product.inactiveProduct')
      // } else if (loggedIn && !props.product.entry?.totalPrice) {
      //   return $t('product.priceOnRequest')
      // } else {
      //   return '-'
      // }
      return '-'
    })

    const updateQuantity = async () => {
      console.log('store functionality')
      // await this.$hybrisApi.cartApi.updateQuantity(
      //   this.entry.entryNumber,
      //   this.quantity
      // )
    }

    const addToOtherList = (product) => {
      console.log('store functionality', product)
      // this.$emit('close')
      // this.$store.commit('setCurrentProduct', product)
      // this.$store.commit('setShoppingListLastProduct', product)
      // this.$store.dispatch('addToList')
    }

    const login = async () => {
      console.log('store functionality')
      // await this.$authApi.login()
    }

    // watch(async (newEntry) => {
    //   quantity = newEntry.quantity
    // })

    return {
      cartEntry,
      quantity,
      image,
      url,
      getUrl,
      userStatusType,
      isInactive,
      isPriceAvailable,
      unavailablePriceState,
      updateQuantity,
      addToOtherList,
      login,
      currentUser,
      loggedIn,
      isLeadUser,
      isOpenUser,
      isRejectedUser,
      isApprovedUser,
      isOciUser,
      isPriceVisible,
      noPriceReason,
      hasCustomerPrice,
      productPrice,
    }
  },
})
</script>

<style lang="scss" scoped>
.cart-item-card {
  margin-top: 48px;

  &__wrapper {
    @apply tw-grid tw-grid-cols-12;
  }

  &__image {
    @apply tw-col-span-1;
    @apply tw-inline-flex;
    @apply tw-justify-center;
    @apply tw-items-center;
    @apply tw-mr-4;
    max-height: 48px;

    // md:tw-col-span-1 tw-pr-3
  }

  &__product-code {
    @apply tw-col-span-6;

    // md:tw-col-span-6 tw-pl-3
  }

  &__quantity {
    @apply tw-col-span-1;

    // md:tw-col-span-4 lg:tw-col-span-1 tw-pr-3
  }

  &__prices {
    @apply tw-col-span-3;
    @apply tw-flex;
    @apply tw-justify-evenly;
    @apply tw-items-center;
  }

  &__price-row {
    @apply tw-grid tw-grid-cols-12;
  }

  &__delete {
    @apply tw-col-span-1;
    @apply tw-flex;
    @apply tw-justify-end;
  }

  &__promotion {
    @apply tw-bg-pv-grey-16;
    @apply tw-text-pv-white;
    @apply tw-rounded-md;
    @apply tw-font-bold;
    @apply tw-text-sm;
    @apply tw-px-2;
    @apply tw-py-1;
    @apply tw-mr-2;
  }
}

// .promotions {
//   @apply tw-mt-6;
// }

// .add-to-other-list {
//   border: none;
//   margin-top: 8px;
//   padding-left: 0;
//   background-color: transparent;
// }

// .tw-container {
//   @apply tw-bg-pv-white;
//   padding: 16px;
//   box-shadow: 0 48px 48px -48px grey;
//   margin-bottom: 16px;

//   .variation-attributes-wrapper {
//     .variation-attribute {
//       display: inline-block;
//       position: relative;
//       margin: 0 8px 8px 0;
//       padding: 4px;
//       @apply tw-bg-pv-grey-96;
//       @apply tw-text-pv-grey-48;
//       font-size: 12px;
//       white-space: wrap;

//       span {
//         color: black;
//         font-size: 12px;
//       }
//     }
//   }

//   h6 {
//     font-size: 14px;
//   }

//   @screen sm {
//     h6 {
//       font-size: 16px;
//     }
//   }

//   .product-image {
//     max-width: 48px;
//   }

//   .product-code {
//     &,
//     a {
//       @apply tw-text-pv-black;
//       font-weight: bold;
//     }
//   }

//   .product-order-number {
//     &,
//     a {
//       @apply tw-text-pv-grey-48;
//     }
//   }

//   .delete-button {
//     text-align: right;

//     button {
//       border: 0 solid transparent;
//       padding-top: 0;
//       padding-right: 0;
//       background-color: transparent;

//       &:focus {
//         @apply tw-text-pv-red;
//         border-color: white;
//         box-shadow: none;
//       }

//       .material-icons {
//         font-size: 24px;
//       }
//     }
//   }

//   .price-row {
//     padding-top: 16px;

//     .login-modal-link {
//       @apply tw-text-pv-red;
//       cursor: pointer;
//       outline: none;
//     }

//     .price-on-request {
//       display: inline-block;
//       padding: 8px;
//       border: 2px solid black;
//       color: black;
//       font-weight: bold;
//       white-space: nowrap;

//       &__empty {
//         border: none;
//       }
//     }

//     .quantity {
//       width: 100%;
//     }

//     .price {
//       text-align: right;
//     }
//   }
// }
</style>
