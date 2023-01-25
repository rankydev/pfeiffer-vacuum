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
        :path="`userStatus.${userStatusType}.priceInfo.text`"
        class="price__wrapper"
        tag="div"
      >
        <template #link>
          <nuxt-link
            :to="localePath('shop-my-account-account-data')"
            class="tw-text-pv-red tw-italic"
          >
            {{ $t(`userStatus.${userStatusType}.priceInfo.link`) }}
          </nuxt-link>
        </template>
      </i18n>
    </template>

    <template v-else-if="!isLoggedIn">
      <div class="price__wrapper">
        {{ $t('product.login.loginToSeePrices.part1') }}
        <span
          class="price__wrapper--login-link"
          @click="login()"
          v-html="$t('product.login.loginToSeePrices.part2')"
        ></span>
        {{ $t('product.login.loginToSeePrices.part3') }}
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia/dist/pinia.mjs'
import { useUserStore } from '~/stores/user'

export default defineComponent({
  setup() {
    // TODO: this initialization needs to be updated after implementing the cartStore
    const currentCart = {
      totalPrice: {
        value: 5,
        formattedValue: '€ 26.387,00',
      },
      totalDiscounts: {
        value: 'test',
        formattedValue: '€ 84,00',
      },
    }

    const totalDiscounts = computed(
      () => currentCart.totalDiscounts.formattedValue
    )
    const hasPromotion = computed(() => currentCart.totalDiscounts.value)

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

    const login = async () => {
      await userStore.login()
    }

    return {
      currentCart,
      totalDiscounts,
      hasPromotion,
      isApprovedUser,
      isLoggedIn,
      login,
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

  &__wrapper {
    @apply tw-p-3;
    @apply tw-text-center;
    @apply tw-font-bold;

    &--login-link {
      @apply tw-cursor-pointer;
      @apply tw-text-pv-red;
    }
  }
}
</style>
