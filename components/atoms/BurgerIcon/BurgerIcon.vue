<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 16"
    fill="none"
    class="burger-icon"
    :class="{ 'burger-icon--active': isActive }"
  >
    <g>
      <path
        d="M0 0H24V2H0V0Z"
        class="burger-icon__path burger-icon__path--top"
      ></path>
      <path
        d="M0 7H24V9H0V7Z"
        class="burger-icon__path burger-icon__path--middle"
      ></path>
      <path
        d="M0 14H24V16H0V14Z"
        class="burger-icon__path burger-icon__path--bottom"
      ></path>
    </g>
  </svg>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BurgerIcon',
  props: {
    /**
     * Control the burger icon form
     */
    isActive: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.burger-icon {
  @apply tw-cursor-pointer;
  @apply tw-w-6 tw-h-6;

  &__path {
    @apply tw-fill-pv-red;
    @apply tw-duration-300;
    @apply tw-ease-in-out;

    .burger-icon:hover & {
      @apply tw-fill-pv-red-lighter;
    }

    &--top {
      transform-origin: 14.5% 28%;

      .burger-icon--active & {
        @apply tw-rotate-45;
      }
    }

    &--middle {
      @apply tw-opacity-100;
      @apply tw-duration-200;
      transition-property: opacity;

      .burger-icon--active & {
        @apply tw-opacity-0;
      }
    }

    &--bottom {
      transform-origin: 15% 72%;

      .burger-icon--active & {
        @apply tw--rotate-45;
      }
    }
  }
}
</style>
