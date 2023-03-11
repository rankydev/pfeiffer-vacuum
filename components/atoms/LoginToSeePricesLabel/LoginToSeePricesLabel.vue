<template>
  <div class="login-to-see-prices-label">
    {{ $t('product.login.loginToSeePrices.part1') }}
    <span class="login-to-see-prices-label__login-link" @click="login()">
      {{ $t('product.login.loginToSeePrices.part2') }}
    </span>
    {{ $t('product.login.loginToSeePrices.part3') }}
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useUserStore } from '@/stores/user'

export default defineComponent({
  name: 'LoginToSeePricesLabel',
  setup() {
    const userStore = useUserStore()

    const login = async () => {
      await userStore.login()
    }

    return {
      login,
    }
  },
})
</script>

<style lang="scss" scoped>
.login-to-see-prices-label {
  @apply tw-font-bold;
  @apply tw-text-pv-grey-16;

  &__login-link {
    @apply tw-cursor-pointer;
    @apply tw-text-pv-red;
  }

  &:hover {
    @apply tw-text-pv-red;
  }
}
</style>
