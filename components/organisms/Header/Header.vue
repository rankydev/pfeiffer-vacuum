<template>
  <header class="header" :class="{ 'header--blur-content': menuIsActive }">
    <ContentWrapper class="header__outer">
      <div class="header__inner">
        <NuxtLink :to="localePath('/')" class="header__logo">
          <Logo />
        </NuxtLink>
        <SearchHeader :has-opacity="active" class="header__search-input" />
        <TopNavigation
          v-model="active"
          :flyout-links="flyoutLinks"
          class="header__top-navigation"
        />
        <ShopNavigation class="header__shop-navigation" />
        <div class="header__break-column" />
        <MainNavigation
          class="header__main-navigation"
          :navigation-entries="navigationEntries"
          :flyout-links="flyoutLinks"
        />
      </div>
    </ContentWrapper>
  </header>
</template>

<script>
import { ref, defineComponent } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'

import Logo from '~/components/atoms/Logo/Logo.vue'
import SearchHeader from './partials/SearchHeader/SearchHeader.vue'
import TopNavigation from './partials/TopNavigation/TopNavigation.vue'
import MainNavigation from './partials/MainNavigation/MainNavigation.vue'
import ShopNavigation from './partials/ShopNavigation/ShopNavigation.vue'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper.vue'

import { useMenuStore } from '~/stores/menu'
import { useMyAccountStore } from '~/stores/myaccount'

export default defineComponent({
  name: 'Header',
  components: {
    Logo,
    SearchHeader,
    TopNavigation,
    MainNavigation,
    ShopNavigation,
    ContentWrapper,
  },
  props: {
    /**
     * A list of flyout links for the top navigation
     */
    flyoutLinks: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
    /**
     * A list of navgation entries for the main navigation
     */
    navigationEntries: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
    /**
     * A list of shop navigation links for myaccount
     */
    shopNavigationLinks: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
  },
  setup(props) {
    const menuStore = useMenuStore()
    const { isActive } = storeToRefs(menuStore)
    const active = ref(false)

    const myAccountStore = useMyAccountStore()
    myAccountStore.hydrateMenuItems(props.shopNavigationLinks)

    return {
      active,
      menuIsActive: isActive,
    }
  },
})
</script>

<style lang="scss">
@import '/assets/scss/z-index';

@mixin border-bottom-mixin {
  @apply tw-border-b-2;
  @apply tw-border-pv-grey-96;
}

.header {
  @apply tw-relative;
  z-index: $header;

  &::before {
    @apply tw-absolute;
    @apply tw-inset-0;
    @apply tw-bg-pv-white;
    content: '';
  }

  &--blur-content {
    &::after {
      @apply tw-fixed;
      @apply tw-inset-0;
      @apply tw--bottom-20;
      @apply tw--z-10;
      @apply tw--z-10;
      @apply tw-bg-pv-black/50;
      content: '';
    }
  }

  &__outer {
    @apply tw-relative;
    @include border-bottom-mixin;
  }

  &__inner {
    @apply tw-py-4;
    @apply tw-flex;
    @apply tw-items-center;
  }

  &__logo {
    @apply tw-mr-auto;
  }

  & .header__top-navigation {
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
    &__outer {
      @apply tw-border-b-0;
    }

    &__inner {
      @apply tw-flex-wrap;
      @apply tw-pt-6 tw-pb-0;
      @include border-bottom-mixin;
    }

    &__logo {
      @apply tw-m-0;
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
    &__inner {
      @apply tw-pt-8;
    }

    &__search-input {
      @apply tw-mx-32;
    }

    &__search-input,
    &__main-navigation {
      @apply tw-shrink tw-grow;
    }

    & .header__top-navigation {
      @apply tw-flex;
    }

    &__shop-navigation {
      @apply tw-order-1;
    }

    &__break-column {
      @apply tw-h-10;
    }
  }
}
</style>
