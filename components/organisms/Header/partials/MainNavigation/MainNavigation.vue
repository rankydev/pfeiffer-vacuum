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
      <MainNavigationLevel
        :navigation-entries="enrichedNavigationEntries"
        :flyout-links="flyoutLinks"
      />
      <!-- flyout -->
      <!-- sign in -->
    </div>
  </nav>
</template>

<script>
import { storeToRefs } from 'pinia'
import {
  computed,
  toRefs,
  useContext,
  defineComponent,
} from '@nuxtjs/composition-api'
import BurgerIcon from '~/components/atoms/BurgerIcon/BurgerIcon.vue'
import MainNavigationLevel from '../MainNavigationLevel/MainNavigationLevel.vue'
import { useMenuStore } from '~/stores/menu'
import { useCategoryStore } from '~/stores/category'

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
    /**
     * A list of flyout links for the top navigation
     */
    flyoutLinks: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
  },
  setup(props, { refs }) {
    const menuStore = useMenuStore()
    const { isActive } = storeToRefs(menuStore)
    const { localePath } = useContext()
    const toggle = () => menuStore.toggle(refs.menu)

    const { navigationEntries } = toRefs(props)

    const categoryStore = useCategoryStore()
    const { categoryTreeNavigationEntries } = storeToRefs(categoryStore)

    const enrichedNavigationEntries = computed(() =>
      navigationEntries.value.map((entry) =>
        entry.useHybrisCategories
          ? {
              ...entry,
              href: localePath('shop-categories'),
              shopLink: undefined,
              navigationEntries: categoryTreeNavigationEntries.value,
            }
          : entry
      )
    )

    return { enrichedNavigationEntries, isActive, toggle }
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
