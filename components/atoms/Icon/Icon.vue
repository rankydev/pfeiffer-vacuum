<template>
  <svg-icon v-if="custom" :name="icon" />
  <span v-else :class="['material-icons', `icon-${size}`]">{{ icon }}</span>
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
     * Used for custom svg from svgSource folder
     */
    custom: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
// Setting default size for custom svg's
.sprite-icons {
  height: 1rem;
  width: 1rem;
}

.material-icons {
  &.icon-xsmall {
    font-size: 1rem;
  }

  &.icon-small {
    font-size: 1.125rem;
  }

  &.icon-base {
    font-size: 1.5rem;
  }

  &.icon-large {
    font-size: 2rem;
  }

  &.icon-xlarge {
    font-size: 4rem;
  }
}
</style>
