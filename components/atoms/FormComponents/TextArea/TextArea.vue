<template>
  <div>
    <label v-if="label || label !== ''" for="textarea">{{ label }}</label>
    <label v-if="!required" class="right-label">(optional)</label>
    <textarea
      :name="'textarea'"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      v-bind="text"
      class="pv-input__element"
      @focus="$emit('focus', true)"
      @blur="$emit('focus', false)"
    ></textarea>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  props: {
    /**
     * The internal text
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * The text displayed at the textarea
     */
    label: {
      type: String,
      default: 'Label',
    },
    /**
     * The placeholder
     */
    placeholder: {
      type: String,
      default: 'Placeholder',
    },
    /**
     * The required prop, which defines if the field is required or not
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * The disabled prop, which defines is disabled
     */
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {},
})
</script>

<style lang="scss">
.right-label {
  @apply tw-relative;
  @apply tw-float-right;
  @apply tw-text-pv-grey-64;
}

.pv-input {
  @apply tw-relative;

  &__element {
    @apply tw-block;
    @apply tw-px-3;
    @apply tw-py-2;
    @apply tw-border-2;
    @apply tw-rounded;
    @apply tw-border-pv-grey-80;
    @apply tw-text-pv-black;

    &:focus {
      @apply tw-border-pv-black;
      @apply tw-ring-0;
      @apply tw-outline-0;
      @apply tw-text-pv-black;
    }

    &:disabled {
      @apply tw-bg-pv-grey-96;
      @apply tw-cursor-not-allowed;
    }

    &::placeholder {
      @apply tw-text-pv-grey-64;
    }
  }
}
</style>
