<template>
  <label v-if="label" :for="tagName" class="pv-label">
    <span>{{ label }}</span>
    <span v-if="optional" class="pv-label__optional">{{
      $t('form.label.optional')
    }}</span>
  </label>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PvLabel',
  props: {
    /**
     * The text displayed over the form component on the left
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * The optional prop, which defines if the form component is optional
     */
    optional: {
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
.pv-label {
  @apply tw-text-pv-grey-16;
  @apply tw-flex;
  @apply tw-justify-between;

  &__optional {
    @apply tw-text-pv-grey-64;
  }
}
</style>
