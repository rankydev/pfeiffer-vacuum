<template>
  <label v-if="label" :for="tagName">
    <span>{{ label }}</span>
    <span v-if="!required" class="label__right-label">(optional)</span>
  </label>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    /**
     * The text displayed over the form component on the left
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * The required prop, which defines if the form component is required or not
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * The tag name of the component the label is for
     */
    tagName: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss">
span {
  all: unset;
}

.label {
  &__right-label {
    @apply tw-relative;
    @apply tw-float-right;
    @apply tw-text-pv-grey-64;
  }
}
</style>
