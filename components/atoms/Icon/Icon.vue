<template>
  <span :class="['material-icons', `icon-${size}`]">{{ icon }}</span>
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
      validator: (val) =>
        ['xsmall', 'small', 'base', 'large', 'xlarge'].includes(val),
    },
  },
})
</script>

<style lang="scss">
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
