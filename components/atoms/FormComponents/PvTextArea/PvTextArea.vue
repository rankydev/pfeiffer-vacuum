<template>
  <div class="pv-textarea">
    <Label :optional="!required" :label="label" tag-name="textarea" />
    <textarea
      name="textarea"
      v-bind="{ text, placeholder, required, disabled }"
      class="pv-textarea__input"
      @focus="$emit('focus', true)"
      @blur="$emit('focus', false)"
    ></textarea>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Label from '~/components/atoms/FormComponents/partials/Label/Label'

export default defineComponent({
  name: 'PvTextArea',
  components: { Label },
  props: {
    /**
     * The internal text
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * The text displayed at the textarea on the left
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * The placeholder
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * The required prop, which defines if the text field is required or not
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * The disabled prop, which defines if it should be possible to enter text into text field or not
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    /**
     * Fired on focus and blur.
     *
     * @event focus
     * @property {boolean} isFocused
     */
    'focus',
  ],
})
</script>

<style lang="scss">
.pv-textarea {
  &__input {
    @apply tw-block;
    @apply tw-px-3;
    @apply tw-py-2;
    @apply tw-border-2;
    @apply tw-rounded-md;
    @apply tw-border-pv-grey-80;
    @apply tw-text-pv-black;
    @apply tw-w-full;

    &:focus {
      @apply tw-border-pv-black;
      @apply tw-text-pv-black;
      outline: 0;
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
