<template>
  <div :class="`promotion-label__${variant}`">
    <slot />
    <span v-if="hasSubline('subline')" class="promotion-label--subline">
      <slot name="subline" />
    </span>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

/**
 * Magic comments for PurgeCSS
 * promotion-label--normal
 * promotion-label--wide
 **/
export default defineComponent({
  name: 'PromotionLabel',
  props: {
    variant: {
      type: String,
      default: 'normal',
    },
  },
  setup(_, { slots }) {
    const hasSubline = (slot) => !!slots?.[slot]

    return { hasSubline }
  },
})
</script>

<style lang="scss">
.promotion-label {
  &__normal {
    @apply tw-bg-pv-grey-16;
    @apply tw-text-pv-white;
    @apply tw-text-base;
    @apply tw-rounded-md;
    @apply tw-font-bold;
    @apply tw-py-2;
    @apply tw-flex tw-justify-center;
  }
}
</style>
