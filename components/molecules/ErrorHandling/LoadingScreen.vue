<template>
  <div
    class="loading-screen"
    :class="{ 'error-handling--grey-bg': greyBackground }"
  >
    <LoadingSpinner class="loading-screen__loading-spinner" />
    <span class="loading-screen__headline">
      {{ headline }}
    </span>
  </div>
</template>

<script>
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoadingScreen',
  components: {
    LoadingSpinner,
  },
  props: {
    headline: {
      type: String,
      required: true,
    },
    greyBackground: {
      type: Boolean,
      default: true,
    },
  },
})
</script>

<style lang="scss">
.loading-screen {
  @apply tw-flex tw-flex-col;
  @apply tw-justify-center tw-items-center;
  @apply tw-text-center;
  @apply tw-text-pv-grey-16;
  @apply tw-px-4;
  @apply tw-py-[278px];
  @apply tw-rounded-lg;

  &--grey-bg {
    @apply tw-bg-pv-grey-96;
  }

  &__loading-spinner {
    @apply tw-pt-1;
  }

  &__headline {
    @apply tw-font-bold;
    @apply tw-mt-6;
  }
}
</style>
