<template>
  <div class="promotion-label">
    <span class="promotion-label--subline"> {{ subline }}</span>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PromotionLabel',
  props: {
    subline: {
      type: String,
      default: 'normal',
    },
  },
})
</script>

<style lang="scss">
.promotion-label {
  @apply tw-bg-pv-grey-16;
  @apply tw-text-pv-white;
  @apply tw-text-base;
  @apply tw-rounded-md;
  @apply tw-font-bold;
  @apply tw-p-2;
  @apply tw-flex tw-justify-center;
}
</style>
