<template>
  <div class="price">
    <template v-if="isApprovedUser && currentCart.totalPrice">
      <div v-if="hasPromotion" class="price__discount">
        <span>{{ $t('cart.orderDiscount') }}</span>

        <span> - {{ totalDiscounts }} </span>
      </div>
      <div class="price__total">
        <span v-if="currentCart.totalPrice.value">
          <span class="tw-font-bold">{{ $t('cart.overall1') }}</span>
          <span>{{ $t('cart.overall2') }}</span>
        </span>

        <span class="tw-font-bold">
          {{
            currentCart.totalPrice.value
              ? currentCart.totalPrice.formattedValue
              : $t('product.priceOnRequest')
          }}
        </span>
      </div>
    </template>

    <template v-else-if="isLoggedIn">
      <i18n
        :path="`cart.userStatus.${userStatusTypeForInfoText}.priceInfo.text`"
        class="price__wrapper"
        tag="div"
      >
        <template #link>
          <nuxt-link
            :to="localePath('shop-my-account-account-data')"
            class="tw-text-pv-red"
          >
            {{
              $t(`cart.userStatus.${userStatusTypeForInfoText}.priceInfo.link`)
            }}
          </nuxt-link>
        </template>
      </i18n>
    </template>

    <template v-else-if="!isLoggedIn">
      <LoginToSeePricesLabel class="price__login-link" />
    </template>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import LoginToSeePricesLabel from '~/components/atoms/LoginToSeePricesLabel/LoginToSeePricesLabel.vue'

export default defineComponent({
  name: 'TotalNetInformation',
  components: { LoginToSeePricesLabel },
  props: {
    currentCart: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { currentCart } = toRefs(props)

    const totalDiscounts = computed(
      () => currentCart.value?.totalDiscounts?.formattedValue
    )

    const hasPromotion = computed(
      () => currentCart.value?.totalDiscounts?.value
    )

    const userStore = useUserStore()
    const { isLoggedIn, isApprovedUser, userStatusTypeForInfoText } =
      storeToRefs(userStore)

    return {
      totalDiscounts,
      hasPromotion,
      isApprovedUser,
      isLoggedIn,
      userStatusTypeForInfoText,
    }
  },
})
</script>

<style lang="scss" scoped>
.price {
  @apply tw-w-full;
  @apply tw-border-t-2 tw-border-b-2;
  @apply tw-border-pv-grey-16;
  @apply tw-py-6;

  &__total,
  &__discount,
  &__wrapper {
    @apply tw-flex tw-items-center;
  }

  &__total {
    @apply tw-text-2xl;
    @apply tw-justify-between;
    @apply tw-text-pv-grey-16;
  }

  &__discount {
    @apply tw-mb-4;
    @apply tw-justify-between;

    span {
      @apply tw-text-pv-warning;

      &:last-of-type {
        @apply tw-font-bold;
        @apply tw-text-xl;
      }
    }
  }

  &__wrapper {
    @apply tw-font-bold;
    @apply tw-justify-center;
  }

  &__login-link {
    @apply tw-text-center;
    @apply tw-p-3;
  }
}
</style>
