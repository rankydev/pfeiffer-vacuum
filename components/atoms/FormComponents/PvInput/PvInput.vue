<template>
  <div class="pv-input">
    <PvLabel :optional="!required" :label="label" />
    <div class="pv-input__wrapper">
      <input
        v-bind="{ placeholder, disabled, ...$attrs }"
        ref="input"
        v-model="internalValue"
        :required="required"
        :type="inputType"
        class="pv-input__element"
        :class="{
          'pv-input__element--icon': icon,
          'pv-input__element--error': !!validation.getError(),
        }"
        :placeholder="placeholder"
        @keypress.enter="$emit('submit', internalValue)"
        @focus="$emit('focus', true)"
        @blur="
          $emit('focus', false)
          validation.validateInput()
        "
      />
      <Icon
        v-if="icon || validation.getError()"
        class="pv-input__icon"
        :class="{ 'pv-input__icon--error': !!validation.getError() }"
        :icon="!!validation.getError() ? 'error_outline' : icon"
        @click.native="$emit('click:icon', internalValue)"
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
import Icon from '~/components/atoms/Icon/Icon.vue'
import ErrorMessage from '~/components/atoms/FormComponents/partials/ErrorMessage/ErrorMessage'
import PvLabel from '~/components/atoms/FormComponents/partials/PvLabel/PvLabel'
import { useInputValidator } from '~/composables/useValidator'

export default defineComponent({
  components: {
    PvLabel,
    ErrorMessage,
    Icon,
  },
  props: {
    /**
     * The input value
     * @model
     */
    value: {
      type: [String, Number],
      default: undefined,
    },
    /**
     * The input type
     * @model
     */
    inputType: {
      type: String,
      default: 'text',
    },
    /**
     * An optional icon that can be shown
     * @see [Icon List] (https://fonts.google.com/icons?selected=Material+Icons)
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * A text which is displayed if no value given
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * The text displayed over the form component via PvLabel component
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * The isRequired prop, which defines if the text field is required or not
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
      default: () => ({}),
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
     * Fired on icon clicked.
     *
     * @event click:icon
     * @property {object} $event
     */
    'click:icon',
    /**
     * Fired on enter key.
     *
     * @event submit
     * @property {string} value
     */
    'submit',
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

    return {
      internalValue,
      validation,
    }
  },
})
</script>

<style lang="scss" scoped>
.pv-input {
  @apply tw-relative;
  @apply tw-w-full;

  &__wrapper {
    @apply tw-relative;
  }

  &__icon {
    @apply tw-absolute;
    @apply tw-top-1/2 tw-right-2;
    @apply tw-cursor-pointer;
    @apply tw-text-pv-grey-64;
    transform: translateY(-50%);

    &--error {
      @apply tw-text-pv-red;
    }
  }

  &__element {
    @apply tw-block;
    @apply tw-w-full;
    @apply tw-text-pv-black;
    @apply tw-px-4;
    @apply tw-py-3;
    @apply tw-shadow-border-grey-80;
    @apply tw-rounded-md;

    // fix for mobile safari to show box-shadow
    appearance: none;

    &:focus {
      @apply tw-border-pv-grey-16;
      @apply tw-ring-0;
      @apply tw-text-pv-grey-16;
      @apply tw-shadow-border-grey-16;

      // safari fix to prevent focus outline
      outline: 0;
    }

    &:disabled {
      @apply tw-bg-pv-grey-96;
      @apply tw-cursor-not-allowed;
    }

    &::placeholder {
      @apply tw-text-pv-grey-64;
    }

    &:focus + .pv-input__icon {
      @apply tw-text-pv-black;
    }

    &--icon {
      @apply tw-pr-10;
    }

    &--error {
      @apply tw-rounded-t-md;
      @apply tw-shadow-border-red;
      @apply tw-rounded-b-none;

      &::-webkit-contacts-auto-fill-button {
        @apply tw-mr-6;
      }
    }
  }
}
</style>
