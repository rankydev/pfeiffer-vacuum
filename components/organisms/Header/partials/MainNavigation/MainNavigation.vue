<template>
  <div class="main-navigation">
    <BurgerIcon
      :is-active="menu.isActive"
      class="main-navigation__trigger"
      tabindex="0"
      @click.native="toggleActive"
      @keypress.native.enter="toggleActive"
    />
    <div>
      <MainNavigationLevel
        class="main-navigation__items"
        :class="{ 'main-navigation__items--active': menu.isActive }"
        :navigation-entries="navigationEntries"
      />
      <!-- flyout -->
      <!-- sign in -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
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
      default: () => [],
    },
  },
  setup() {
    const menu = useMenuStore()

    const toggleActive = () => {
      !menu.isActive ? menu.open() : menu.close()
    }

    return { menu, toggleActive }
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
