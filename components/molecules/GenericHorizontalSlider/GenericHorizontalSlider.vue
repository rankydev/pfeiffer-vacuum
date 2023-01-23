<template>
  <div class="generic-horizontal-slider">
    <div
      class="generic-horizontal-slider__content"
      :class="{
        'generic-horizontal-slider__content--show-scrollbar': showScrollbar,
      }"
      @touchstart="toggleScrollbarClass(true)"
      @touchend="toggleScrollbarClass(false)"
    >
      <slot />
    </div>
    <div class="generic-horizontal-slider__overlay"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const showScrollbar = ref(false)

    const toggleScrollbarClass = (bool) => {
      showScrollbar.value = bool
    }

    return {
      toggleScrollbarClass,
      showScrollbar,
    }
  },
})
</script>

<style lang="scss" scoped>
.generic-horizontal-slider {
  @apply tw-relative;
  @apply tw-bg-pv-grey-96;

  &__content {
    @apply tw-overflow-y-scroll;

    &::-webkit-scrollbar {
      @apply tw-bg-pv-grey-96;
      @apply tw-h-0.5;
    }

    &::-webkit-scrollbar-thumb {
      @apply tw-bg-pv-grey-96;
      @apply tw-rounded-t-sm;
    }

    &--show-scrollbar {
      &::-webkit-scrollbar-thumb {
        @apply tw-bg-pv-red;
      }
    }
  }

  &__overlay {
    @apply tw-inline-block;
    @apply tw-absolute;
    @apply tw-right-0 tw-top-0;
    @apply tw-h-full;
    @apply tw-w-8;
    @apply tw-bg-gradient-to-r tw-from-pv-transparent tw-via-pv-grey-96 tw-to-pv-grey-96;

    @screen lg {
      @apply tw-hidden;
    }
  }
}
</style>
