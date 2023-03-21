<template>
  <div class="loading-spinner">
    <slot>
      <div
        class="loading-spinner__placeholder"
        :class="`loading-spinner__placeholder--${size}`"
      >
        &nbsp;
      </div>
    </slot>
    <div v-if="show" class="loading-spinner__overlay">
      <span
        class="loading-spinner__spinner"
        :class="[
          `loading-spinner__spinner--${color}`,
          `loading-spinner__spinner--${size}`,
        ]"
      ></span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoadingSpinner',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'red',
      validator: (val) => ['green', 'red'].includes(val),
    },
    size: {
      type: String,
      default: 'normal',
      validator: (val) => ['small', 'normal'].includes(val),
    },
  },
})
</script>

<style lang="scss">
@import '/assets/scss/z-index';

.loading-spinner {
  @apply tw-relative;

  &__placeholder {
    &--normal {
      @apply tw-h-8;
      @apply tw-w-8;
    }

    &--small {
      @apply tw-h-6;
      @apply tw-w-6;
    }
  }

  &__overlay {
    @apply tw-absolute;
    @apply tw-inset-0;
    @apply tw-flex tw-justify-center tw-items-center;
    z-index: $loading-spinner-overlay;
    backdrop-filter: blur(1px);
  }

  &__spinner {
    @apply tw-border-solid;
    @apply tw-animate-spin;
    border-radius: 50%;

    &--normal {
      @apply tw-w-8 tw-h-8;
      @apply tw-border-4;
    }

    &--small {
      @apply tw-w-6 tw-h-6;
      @apply tw-border-2;
    }

    &--green {
      @apply tw-border-pv-green;
      border-left-color: transparent;
    }

    &--red {
      @apply tw-border-pv-red;
      border-left-color: transparent;
    }
  }
}
</style>
