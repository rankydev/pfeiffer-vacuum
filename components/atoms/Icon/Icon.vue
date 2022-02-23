<template>
  <span :class="['material-icons', `icon-${size}`]">{{ icon }}</span>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'base',
      validator: (val) => ['small', 'base', 'large'].includes(val),
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
