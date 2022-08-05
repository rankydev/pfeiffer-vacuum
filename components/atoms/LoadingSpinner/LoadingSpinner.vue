<template>
  <div class="loading-spinner">
    <slot>
      <div class="loading-spinner__placeholder">&nbsp;</div>
    </slot>
    <div v-if="show" class="loading-spinner__overlay">
      <span class="loading-spinner__spinner"></span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
})
</script>

<style lang="scss">
.loading-spinner {
  @apply tw-relative;

  &__placeholder {
    @apply tw-h-8;
  }

  &__overlay {
    @apply tw-absolute;
    @apply tw-inset-0;
    @apply tw-flex tw-justify-center tw-items-center;
    @apply tw-z-10;
    backdrop-filter: blur(1px);
  }

  &__spinner {
    @apply tw-w-8 tw-h-8;
    @apply tw-border-4 tw-border-solid tw-border-pv-green;
    @apply tw-animate-spin;
    border-left-color: transparent;
    border-radius: 50%;
  }
}
</style>
