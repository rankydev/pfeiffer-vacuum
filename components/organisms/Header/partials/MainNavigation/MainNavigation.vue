<template>
  <div class="main-navigation">
    <BurgerIcon
      :is-active="isActive"
      class="main-navigation__trigger"
      tabindex="0"
      @click.native="isActive = !isActive"
      @keypress.native.enter="isActive = !isActive"
    />
    <div>
      <PrimaryNavLink
        class="main-navigation__items"
        :class="{ 'main-navigation__items--active': isActive }"
      />
      <!-- flyout -->
      <!-- sign in -->
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import BurgerIcon from '~/components/atoms/BurgerIcon/BurgerIcon.vue'

export default defineComponent({
  components: {
    BurgerIcon,
  },
  setup() {
    const isActive = ref(false)

    return { isActive }
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
