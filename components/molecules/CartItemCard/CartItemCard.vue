<template>
  <div v-if="entry.product" class="cart-item-card tw-container tw-bg-pv-white">
    <div class="cart-item-card__wrapper">
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
      <div class="cart-item-card__quanity">
        <span v-if="readOnly">
          {{ $t('cart.quantity') }}: {{ entry.quantity }}
        </span>
        <PvInput
          v-else
          v-model="quantity"
          input-type="number"
          class="cart-item-card__quanity-input"
          @input="updateQuantity"
        />
      </div>
      <div class="cart-item-card__prices">
        <p>{{ productPrice }}</p>
        <p v-if="productPrice">{{ `${totalPrice}` }}</p>
        <p v-else>{{ totalPrice }}</p>
      </div>
      <div class="cart-item-card__delete">
        <Button variant="secondary" shape="plain" icon="delete" />
      </div>
    </div>
    <div class="cart-item-card__attribute-wrapper tw-grid">
      <div
        v-if="showAttributes"
        class="cart-item-card__variation-attributes-row"
      >
        <div
          v-for="(attribute, attributeIndex) in entry.product.variationMatrix
            .variationAttributes"
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

    <div class="cart-item-card__promotions-wrapper tw-grid">
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
    <div class="cart-item-card__further-article-information">
      <div class="cart-item-card__add-to-other-list">
        <Button
          class="cart-item-card__add-to-other-list-btn"
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
    const productPrice = ref(1000)

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

    const isPriceAvailable = computed(() => {
      return !!(
        loggedIn &&
        props.entry.product?.purchasable !== false &&
        props.entry.product?.totalPrice
      )
    })

    const unavailablePriceState = computed(() => {
      if (props.entry.product?.purchasable === false) {
        return $t('product.inactiveProduct')
      } else if (loggedIn && !props.product.entry?.totalPrice) {
        return $t('product.priceOnRequest')
      } else {
        return '-'
      }
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

    const addToOtherList = (product) => {
      console.log('store functionality', product)
    }

    const login = async () => {
      console.log('store functionality')
    }

    return {
      cartEntry,
      quantity,
      image,
      // url,
      // getUrl,
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
      // isPriceVisible,
      // noPriceReason,
      // hasCustomerPrice,
      productPrice,
      totalPrice,
    }
  },
})
</script>

<style lang="scss" scoped>
.cart-item-card {
  @apply tw-py-6;

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

  &__attribute-wrapper {
    @apply tw-grid-cols-12;
    @apply tw-mt-4;
  }

  &__variation-attributes-row {
    @apply tw-col-start-2 tw-col-span-6;
    @apply tw-flex;
    @apply tw-flex-wrap;
  }

  &__cart-item-card__variation-attributes {
    @apply tw-flex;
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
    @apply tw-mr-2;
    @apply tw-rounded-md;
  }

  &__attribute-name {
    @apply tw-text-pv-grey-64;
  }

  &__promotions-wrapper {
    @apply tw-grid-cols-12;
  }

  &__promotions {
    @apply tw-col-span-6;
    @apply tw-col-start-2;
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

  &__further-article-information {
    @apply tw-grid;
    @apply tw-grid-cols-12;
    @apply tw-mt-6;
  }

  &__add-to-other-list {
    @apply tw-flex;
    @apply tw-col-span-2;
    @apply tw-col-start-2;
  }
}
</style>
