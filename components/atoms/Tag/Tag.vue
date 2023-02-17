<template>
  <div class="tag">
    <span v-if="label" class="tag-label">{{ label }}</span>
    <span v-if="label && content" class="tag-separator">:</span>
    <span v-if="content" class="tag-content">{{ content }}</span>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Tag',
  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
    content: {
      type: String,
      required: false,
      default: null,
    },
  },
})
</script>
<style lang="scss">
.tag {
  @apply tw-bg-pv-grey-96;
  @apply tw-w-fit;
  @apply tw-px-2 tw-py-1;
  @apply tw-rounded;

  &-label {
    @apply tw-text-sm;
    @apply tw-text-pv-grey-64;
  }

  &-separator {
    @apply tw-text-sm;
    @apply tw-ml-[-2px];
  }

  &-content {
    @apply tw-text-sm;
    @apply tw-text-pv-grey-16;
  }
}
</style>
