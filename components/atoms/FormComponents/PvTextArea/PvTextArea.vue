<template>
  <div class="pv-textarea">
    <PvLabel :optional="!required" :label="label" tag-name="textarea" />
    <div class="pv-textarea__wrapper">
      <textarea
        v-model="internalValue"
        name="textarea"
        v-bind="{ placeholder, required, disabled }"
        class="pv-textarea__input"
        :class="{ 'pv-textarea__input--error': !!validation.getError() }"
        @focus="$emit('focus', true)"
        @blur="$emit('focus', false)"
        @input="validation.validateInput()"
      />
      <Icon
        v-if="!!validation.getError()"
        class="pv-textarea__icon-error"
        icon="error_outline"
      />
    </div>
    <ErrorMessage
      v-if="!!validation.getError()"
      :error-message="validation.getError()"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import PvLabel from '~/components/atoms/FormComponents/partials/PvLabel/PvLabel'
import Icon from '~/components/atoms/Icon/Icon.vue'
import ErrorMessage from '~/components/atoms/FormComponents/partials/ErrorMessage/ErrorMessage'
import { useInputValidator } from '~/composables/useValidator'

export default defineComponent({
  name: 'PvTextArea',
  components: { PvLabel, ErrorMessage, Icon },
  props: {
    /**
     * The internal value
     */
    value: {
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
    /**
     * defines what should be validated
     */
    rules: {
      type: Object,
      default: () => {},
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
    /**
     * Fired on keystroke.
     *
     * @event change
     * @property {string} value
     */
    'input',
  ],
  setup(props, { emit }) {
    const internalValue = computed({
      get: () => props.value,
      set: (newVal) => {
        emit('input', newVal)
      },
    })

    const validation = useInputValidator(props.rules, internalValue)

    return { internalValue, validation }
  },
})
</script>

<style lang="scss">
.pv-textarea {
  &__wrapper {
    @apply tw-relative;
  }

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

    &:focus + .pv-textarea__icon-error {
      @apply tw-text-pv-black;
    }

    &:disabled {
      @apply tw-bg-pv-grey-96;
      @apply tw-cursor-not-allowed;
    }

    &::placeholder {
      @apply tw-text-pv-grey-64;
    }

    &--error {
      @apply tw-rounded-t-md;
      @apply tw-rounded-b-none;
      @apply tw-border-pv-red;
    }
  }

  &__icon-error {
    @apply tw-absolute;
    @apply tw-top-0 tw-right-2;
    @apply tw-cursor-pointer;
    margin-top: 10px;
    @apply tw-text-pv-red;
  }
}
</style>
