<template>
  <div class="badge">
    <span class="badge-label">{{ label }}:</span>
    <span class="badge-content">{{ content }}</span>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Badge',
  props: {
    label: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
})
</script>
<style lang="scss">
.badge {
  @apply tw-text-sm;
  @apply tw-leading-4;
  @apply tw-bg-pv-grey-96;
  @apply tw-w-fit;
  @apply tw-px-2 tw-py-1;
  @apply tw-rounded-sm;

  &-label {
    @apply tw-text-pv-grey-64;
  }

  &-content {
    @apply tw-ml-1;
    @apply tw-text-pv-grey-16;
  }
}
</style>
