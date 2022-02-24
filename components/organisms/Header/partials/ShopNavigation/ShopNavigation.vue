<template>
  <div class="shop-navigation">
    <NuxtLink to="#" class="shop-navigation__account">
      <Icon class="shop-navigation__icon" icon="person" />
      <span class="shop-navigation__account-name">Sign In</span>
    </NuxtLink>

    <NuxtLink to="#" class="shop-navigation__comparhension">
      <Icon class="shop-navigation__icon" icon="compare_arrows" />
    </NuxtLink>

    <NuxtLink to="#" class="shop-navigation__shopping-list">
      <Icon class="shop-navigation__icon" icon="assignment" />
    </NuxtLink>

    <NuxtLink to="#" class="shop-navigation__shopping-cart">
      <Icon class="shop-navigation__icon" icon="shopping_cart" />
    </NuxtLink>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: {
    Icon,
  },
})
</script>

<style lang="scss">
.shop-navigation {
  @apply tw-flex;
  @apply tw-items-center;

  &__account {
    @apply tw-hidden;

    @screen md {
      @apply tw-flex;
    }
  }

  &__account-name {
    @apply tw-hidden;
    @apply tw-ml-2;
    @apply tw-font-bold;
    @apply tw-leading-6;
    @apply tw-whitespace-nowrap;

    @screen lg {
      @apply tw-block;
    }
  }

  &__comparhension {
    @apply tw-hidden;

    @screen md {
      @apply tw-block;
    }
  }

  &__icon {
    @apply tw-block;
  }

  &__comparhension,
  &__shopping-list,
  &__shopping-cart {
    @apply tw-ml-3;

    @screen md {
      @apply tw-ml-4;
    }

    @screen lg {
      @apply tw-ml-6;
    }
  }

  &__account,
  &__comparhension,
  &__shopping-list,
  &__shopping-cart {
    @apply tw-text-pv-red;
    @apply tw-transition-colors;
    @apply tw-ease-in-out;
    @apply tw-duration-200;

    &:hover {
      @apply tw-text-pv-red-lighter;
    }
  }
}
</style>