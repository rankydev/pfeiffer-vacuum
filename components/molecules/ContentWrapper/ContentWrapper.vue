<template>
  <div :class="classList">
    <slot />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ContentWrapper',
  props: {
    breakout: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const classList = computed(() => ({
      'content-wrapper': !props.breakout,
      'content-wrapper--breakout': props.breakout,
      'content-wrapper--no-padding': props.noPadding,
    }))

    return {
      classList,
    }
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

  &--no-padding {
    @apply tw-p-0;
  }

  &--breakout {
    @apply tw-relative;
    @apply tw-w-screen;
    @apply tw-left-2/4;
    margin-left: -50vw;
  }
}
</style>
