<template>
  <div class="error-message">
    {{ errorMessage }}
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ErrorMessage',
  props: {
    /**
     * The error message displayed under the form component
     */
    errorMessage: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss">
.error-message {
  @apply tw-block;
  @apply tw-px-2;
  @apply tw-py-1;
  @apply tw-border-2;
  @apply tw-rounded-b-md;
  @apply tw-border-pv-red;
  @apply tw-bg-pv-red;
  @apply tw-text-xs;
  @apply tw-text-pv-white;
  @apply tw-w-full;
}
</style>
