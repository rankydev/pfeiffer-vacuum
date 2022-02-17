<template>
  <div class="shop-navigation">
    <div class="shop-navigation__account">
      <PvIcon icon="person" />
      <span class="shop-navigation__account-name">Sign In</span>
    </div>
    <PvIcon icon="compare_arrows" class="shop-navigation__comparhension" />
    <PvIcon icon="assignment" class="shop-navigation__shopping-list" />
    <PvIcon icon="shopping_cart" class="shop-navigation__shopping-cart" />
  </div>
</template>

<script setup>
import PvIcon from '~/components/atoms/Icon/Icon.vue'
</script>

<style lang="scss">
.shop-navigation {
  @apply tw-flex;

  &__account,
  &__comparhension,
  &__shopping-list,
  &__shopping-cart {
    @apply tw-text-pv-red;
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
}
</style>
