<template>
  <svg-icon
    v-if="type === 'svg'"
    :name="icon"
    :class="['icon__svg', `icon--${size}`]"
  />
  <span
    v-else
    class="material-icon"
    :class="['icon__material', `icon--${size}`]"
  >
    {{ icon }}
  </span>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    /**
     * The icon to display
     * @see [Icon List] (https://fonts.google.com/icons?selected=Material+Icons)
     */
    icon: {
      type: String,
      required: true,
    },
    /**
     * The size of the icon
     * @values small, base, large, xlarge
     */
    size: {
      type: String,
      default: 'base',
      validator: (val) => ['small', 'base', 'large', 'xlarge'].includes(val),
    },
    /**
     * Set the type of icon
     * @values small, base, large, xlarge
     */
    type: {
      type: String,
      default: 'material-icon',
      validator: (val) => ['material-icon', 'svg'].includes(val),
    },
  },
})
</script>

<style lang="scss">
.icon {
  &__svg {
    @apply tw-h-10 tw-w-10;

    @screen md {
      @apply tw-h-16 tw-w-16;
    }
  }

  &__material {
    &.icon--xsmall {
      font-size: 1rem;
    }

    &.icon--small {
      font-size: 1.125rem;
    }

    &.icon--base {
      font-size: 1.5rem;
    }

    &.icon--large {
      font-size: 2rem;
    }

    &.icon--xlarge {
      font-size: 4rem;
    }
  }
}
</style>
