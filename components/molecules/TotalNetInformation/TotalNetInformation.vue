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
        :path="`cart.userStatus.${userStatusType}.priceInfo.text`"
        class="price__wrapper"
        tag="div"
      >
        <template #link>
          <nuxt-link
            :to="localePath('shop-my-account-account-data')"
            class="tw-text-pv-red"
          >
            {{ $t(`cart.userStatus.${userStatusType}.priceInfo.link`) }}
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
import { defineComponent, computed } from '@nuxtjs/composition-api'
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
    const totalDiscounts = computed(
      () => props.currentCart.totalDiscounts.formattedValue
    )
    const hasPromotion = computed(() => props.currentCart.totalDiscounts.value)

    const userStore = useUserStore()
    const {
      isLoggedIn,
      isApprovedUser,
      isLeadUser,
      isOpenUser,
      isRejectedUser,
    } = storeToRefs(userStore)

    const userStatusType = computed(() => {
      if (isLeadUser.value) return 'lead'
      if (isOpenUser.value) return 'open'
      if (isRejectedUser.value) return 'rejected'
    })

    return {
      totalDiscounts,
      hasPromotion,
      isApprovedUser,
      isLoggedIn,
      userStatusType,
    }
  },
})
</script>

<style lang="scss" scoped>
.price {
  @apply tw-w-full;
  @apply tw-border-t-2 tw-border-b-2;
  @apply tw-border-pv-black;
  @apply tw-py-6;

  &__total,
  &__discount {
    @apply tw-flex tw-justify-between tw-items-center;
  }

  &__total {
    @apply tw-text-2xl;
  }

  &__discount {
    @apply tw-mb-4;

    span {
      @apply tw-text-pv-warning;

      &:last-of-type {
        @apply tw-font-bold;
        @apply tw-text-xl;
      }
    }
  }

  &__login-link {
    @apply tw-text-center;
    @apply tw-p-3;
  }
}
</style>
