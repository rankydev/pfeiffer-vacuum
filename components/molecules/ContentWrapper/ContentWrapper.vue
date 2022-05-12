<template>
  <div :class="breakout ? 'breakout' : 'content-wrapper'">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    breakout: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.content-wrapper {
  @apply tw-px-4;
  @apply tw-mx-auto;
  @apply tw-container;

  @screen md {
    @apply tw-px-6;
  }

  @screen lg {
    @apply tw-px-8;
  }
}

.breakout {
  @apply tw-relative;
  @apply tw-w-screen;
  @apply tw-left-2/4;
  margin-left: -50vw;
}
</style>
