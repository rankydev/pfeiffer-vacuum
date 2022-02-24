<template>
  <div class="header">
    <NuxtLink to="/" class="header__logo"><Logo /></NuxtLink>
    <SearchHeader :has-opacity="active" class="header__search-input" />
    <TopNavigation
      v-model="active"
      :flyout-links="flyoutLinks"
      class="header__top-navigation"
    />
    <ShopNavigation class="header__shop-navigation" />
    <div class="header__break-column" />
    <MainNavigation class="header__main-navigation" />
  </div>
</template>

<script>
import { ref, defineComponent } from '@nuxtjs/composition-api'

import Logo from '~/components/atoms/Logo/Logo.vue'
import SearchHeader from './partials/SearchHeader/SearchHeader.vue'
import TopNavigation from './partials/TopNavigation/TopNavigation.vue'
import MainNavigation from './partials/MainNavigation/MainNavigation.vue'
import ShopNavigation from './partials/ShopNavigation/ShopNavigation.vue'

export default defineComponent({
  components: {
    Logo,
    SearchHeader,
    TopNavigation,
    MainNavigation,
    ShopNavigation,
  },
  props: {
    /**
     * A list of flyout links for the top navigation
     */
    flyoutLinks: {
      type: Array,
      default: () => [],
    },
    /**
     * A list of navgation entries for the main navigation
     */
    navigationEntries: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const active = ref(false)

    return { active }
  },
})
</script>

<style lang="scss">
.header {
  @apply tw-flex;
  @apply tw-items-center;
  @apply tw-container;
  @apply tw-py-4;

  &__logo {
    @apply tw-shrink tw-grow;
  }

  &__top-navigation {
    @apply tw-hidden;
  }

  &___search-input,
  &__shop-navigation,
  &__main-navigation {
    @apply tw-shrink-0 tw-grow-0;
  }

  &__break-column {
    @apply tw-hidden;
  }

  @screen md {
    @apply tw-flex-wrap;

    &__logo {
      @apply tw-shrink tw-grow-0;
    }

    &__search-input {
      @apply tw-mx-6;
      @apply tw-flex;
      @apply tw-justify-items-stretch;
    }

    &__search-input,
    &__main-navigation {
      @apply tw-shrink tw-grow;
    }

    &__break-column {
      @apply tw-block;
      @apply tw-h-6;
      @apply tw-basis-full;
    }
  }

  @screen lg {
    &__search-input {
      @apply tw-mx-32;
    }

    &__search-input,
    &__main-navigation {
      @apply tw-shrink tw-grow;
    }

    &__top-navigation {
      @apply tw-flex;
    }

    &__shop-navigation {
      @apply tw-order-1;
    }
  }
}
</style>
