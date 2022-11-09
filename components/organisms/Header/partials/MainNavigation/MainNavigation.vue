<template>
  <nav ref="menu" class="main-navigation" aria-label="Main Menu">
    <button
      aria-controls="js__main-navigation"
      class="main-navigation__trigger"
      :aria-expanded="isActive"
      @click="toggle"
      @keypress.enter="toggle"
    >
      <BurgerIcon :is-active="isActive" />
    </button>
    <div
      id="js__main-navigation"
      class="main-navigation__items"
      :class="{ 'main-navigation__items--active': isActive }"
    >
      <MainNavigationLevel :navigation-entries="navigationEntries" />
      <!-- flyout -->
      <!-- sign in -->
    </div>
  </nav>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import BurgerIcon from '~/components/atoms/BurgerIcon/BurgerIcon.vue'
import MainNavigationLevel from '../MainNavigationLevel/MainNavigationLevel.vue'
import { useMenuStore } from '~/stores/menu'

export default defineComponent({
  components: {
    BurgerIcon,
    MainNavigationLevel,
  },
  props: {
    navigationEntries: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
  },
  setup(_, { refs }) {
    const menu = useMenuStore()
    const toggle = () => menu.toggle(refs.menu)

    return { isActive: menu.isActive, toggle }
  },
})
</script>

<style lang="scss">
.main-navigation {
  &__trigger {
    @apply tw-ml-3;
    @apply tw-block;

    @screen md {
      @apply tw-hidden;
    }
  }

  &__items {
    @apply tw-hidden;
    @apply tw-flex-col;
    @apply tw-absolute;
    @apply tw-top-full tw-inset-x-0;
    @apply tw-bg-pv-white;
    @apply tw-mt-0.5;

    &--active {
      @apply tw-flex;
    }

    @screen md {
      @apply tw-flex;
      @apply tw-static;
      @apply tw-flex-row;
      @apply tw-mt-0;
    }
  }
}
</style>
