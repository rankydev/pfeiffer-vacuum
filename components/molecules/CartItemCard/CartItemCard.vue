<template>
  <div v-if="entry.product" class="tw-container">
    <div class="tw-grid tw-grid-cols-12">
      <div
        class="tw-col-span-3 md:tw-col-span-2 tw-pr-3 tw-inline-flex tw-justify-center tw-items-center"
      >
        <Link :href="getProductUrl(entry.product.code)">
          <ResponsiveImage
            class="product-image"
            :image="getProductThumbnail(entry.product)"
          />
        </Link>
      </div>
      <div class="product-code tw-col-span-7 md:tw-col-span-8 tw-pl-3">
        <h6>
          <Link :href="getProductUrl(entry.product.code)">
            {{ entry.product.name }}
          </Link>
        </h6>
        <p class="product-order-number">
          {{ entry.product.orderNumber }}
        </p>
      </div>
      <div class="tw-col-span-2 delete-button">
        <Button
          v-if="!readOnly"
          variant="secondary"
          icon="close"
          @click="$hybrisApi.cartApi.deleteEntry(entry.entryNumber)"
        />
      </div>
    </div>
    <div class="promotions">
      <div v-for="(promo, x) in promotions" :key="x">
        {{ promo.description }}
      </div>
      <!-- <promotion-label v-for="(promo, x) in promotions" :key="x">
        {{ promo.description }}
      </promotion-label> -->
    </div>
    <div class="tw-grid tw-grid-cols-12 price-row">
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
        <!-- price-on-request__empty -->
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
          <h6 v-if="entry.totalPrice">
            {{ entry.totalPrice.formattedValue }}
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
    </div>
    <div v-if="showAttributes" class="variation-attributes-wrapper">
      <p>Test</p>
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
    <div v-if="currentUser && !isOciUser" class="further-article-information">
      <Button
        class="add-to-other-list"
        variant="secondary"
        icon="assignment"
        :label="$t('list.addArticle')"
        @click="addToOtherList(entry.product)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import Link from '~/components/atoms/Link/Link'
import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage'

export default defineComponent({
  name: 'CartItemCard',
  components: {
    Button,
    Link,
    ResponsiveImage,
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
    // ...mapGetters([
    //   'currentUser',
    //   'loggedIn',
    //   'isLeadUser',
    //   'isOpenUser',
    //   'isRejectedUser',
    //   'isApprovedUser',
    //   'isOciUser'
    // ]),
    const cartEntry = ref(props.entry)
    const quantity = ref(props.entry.quantity)

    const userStatusType = computed(() => {
      return (
        (isLeadUser && 'lead') ||
        (isOpenUser && 'open') ||
        (isRejectedUser && 'rejected')
      )
    })

    const isInactive = computed(() => {
      return cartEntry.product?.purchasable === false
    })

    const isPriceAvailable = computed(() => {
      return !!(
        loggedIn &&
        cartEntry.product?.purchasable !== false &&
        cartEntry.totalPrice?.value
      )
    })

    const unavailablePriceState = computed(() => {
      if (cartEntry.product.purchasable === false) {
        return $t('product.inactiveProduct')
      } else if (loggedIn && !cartEntry.totalPrice.value) {
        return $t('product.priceOnRequest')
      } else {
        return '-'
      }
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

    watch(async (newEntry) => {
      quantity = newEntry.quantity
    })

    return {
      cartEntry,
      quantity,
      userStatusType,
      isInactive,
      isPriceAvailable,
      unavailablePriceState,
      updateQuantity,
      addToOtherList,
      login,
    }
  },
})
</script>

<style lang="scss" scoped>
.promotions {
  @apply tw-mt-6;
}

.add-to-other-list {
  border: none;
  margin-top: 8px;
  padding-left: 0;
  background-color: transparent;
}

.tw-container {
  @apply tw-bg-pv-white;
  padding: 16px;
  box-shadow: 0 48px 48px -48px grey;
  margin-bottom: 16px;

  .variation-attributes-wrapper {
    .variation-attribute {
      display: inline-block;
      position: relative;
      margin: 0 8px 8px 0;
      padding: 4px;
      @apply tw-bg-pv-grey-96;
      @apply tw-text-pv-grey-48;
      font-size: 12px;
      white-space: wrap;

      span {
        color: black;
        font-size: 12px;
      }
    }
  }

  h6 {
    font-size: 14px;
  }

  @screen sm {
    h6 {
      font-size: 16px;
    }
  }

  .product-image {
    max-width: 48px;
  }

  .product-code {
    &,
    a {
      @apply tw-text-pv-black;
      font-weight: bold;
    }
  }

  .product-order-number {
    &,
    a {
      @apply tw-text-pv-grey-48;
    }
  }

  .delete-button {
    text-align: right;

    button {
      border: 0 solid transparent;
      padding-top: 0;
      padding-right: 0;
      background-color: transparent;

      &:focus {
        @apply tw-text-pv-red;
        border-color: white;
        box-shadow: none;
      }

      .material-icons {
        font-size: 24px;
      }
    }
  }

  .price-row {
    padding-top: 16px;

    .login-modal-link {
      @apply tw-text-pv-red;
      cursor: pointer;
      outline: none;
    }

    .price-on-request {
      display: inline-block;
      padding: 8px;
      border: 2px solid black;
      color: black;
      font-weight: bold;
      white-space: nowrap;

      &__empty {
        border: none;
      }
    }

    .quantity {
      width: 100%;
    }

    .price {
      text-align: right;
    }
  }
}
</style>
