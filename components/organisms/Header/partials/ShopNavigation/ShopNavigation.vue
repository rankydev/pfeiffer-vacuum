<template>
  <div class="shop-navigation">
    <Link href="#" class="shop-navigation__account">
      <Icon class="shop-navigation__icon" icon="person" />
      <span class="shop-navigation__account-name">{{
        $t('account.signIn')
      }}</span>
    </Link>

    <Link href="#" class="shop-navigation__comparhension">
      <Icon class="shop-navigation__icon" icon="compare_arrows" />
    </Link>

    <Link href="#" class="shop-navigation__shopping-list">
      <Icon class="shop-navigation__icon" icon="assignment" />
    </Link>

    <Link href="#" class="shop-navigation__shopping-cart">
      <Icon class="shop-navigation__icon" icon="shopping_cart" />
    </Link>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import Icon from '~/components/atoms/Icon/Icon.vue'
import Link from '~/components/atoms/Link/Link.vue'

export default defineComponent({
  components: {
    Icon,
    Link,
  },
})
</script>

<style lang="scss">
.shop-navigation {
  @apply tw-flex;
  @apply tw-items-center;

  @screen lg {
    @apply tw-pb-8;
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
