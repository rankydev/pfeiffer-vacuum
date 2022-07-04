<template>
  <div class="pv-input">
    <Label :label="label" />
    <div class="pv-input__wrapper">
      <input
        v-model="internalValue"
        v-bind="{ placeholder, required, disabled }"
        class="pv-input__element"
        :class="[
          icon ? 'pv-input__element--icon' : '',
          hasError ? 'pv-input__element--error' : '',
        ]"
        :placeholder="placeholder"
        @keypress.enter="$emit('submit', $event)"
        @focus="$emit('focus', true)"
        @blur="$emit('focus', false)"
        @input="$emit('update', internalValue)"
      />
      <Icon
        v-if="internalIcon"
        class="pv-input__icon"
        :class="hasError ? 'pv-input__icon--error' : 'pv-input__icon'"
        :icon="internalIcon"
        @click.native="$emit('click:icon', $event)"
      />
    </div>
    <ErrorMessage v-if="hasError" :error-message="errorMessage" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import Icon from '~/components/atoms/Icon/Icon.vue'
import { ref } from '@nuxtjs/composition-api'
import ErrorMessage from '~/components/atoms/FormComponents/partials/ErrorMessage/ErrorMessage'
import Label from '~/components/atoms/FormComponents/partials/Label/Label'

export default defineComponent({
  components: {
    Icon,
    Label,
    ErrorMessage,
  },
  props: {
    /**
     * The input value
     * @model
     */
    value: {
      type: String,
      default: '',
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
     * The text displayed over the form component via Label component
     */
    label: {
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
     * The hasError is set by validation in parent component and shows if the input has an error
     */
    hasError: {
      type: Boolean,
      default: false,
    },
    /**
     * A text describing which error occured, it is displayed if hasError is true
     */
    errorMessage: {
      type: String,
      default: '',
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
    'update',
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
  ],
  setup(props) {
    const internalValue = ref(props.value)
    let internalIcon = ref(props.icon)

    if (props.hasError) {
      internalIcon = 'error'
    }

    return {
      internalValue,
      internalIcon,
    }
  },
})
</script>

<style lang="scss">
.pv-input {
  @apply tw-relative;

  &__wrapper {
    @apply tw-relative;
  }

  &__icon {
    @apply tw-absolute;
    @apply tw-top-1/2 tw-right-2;
    @apply tw-cursor-pointer tw-text-pv-grey-64;
    transform: translateY(-50%);

    &--error {
      @apply tw-text-pv-red;
    }
  }

  &__element {
    @apply tw-block;
    @apply tw-w-full;
    @apply tw-text-pv-grey-64;
    @apply tw-px-3;
    @apply tw-py-2;
    @apply tw-border-2;
    @apply tw-rounded;
    @apply tw-border-pv-grey-80;

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

    &:focus + .pv-input__icon {
      @apply tw-text-pv-black;
    }

    &--icon {
      @apply tw-pr-10;
    }

    &--error {
      @apply tw-rounded-t;
      @apply tw-border-pv-red;
      @apply tw-rounded-b-none;
    }
  }
}
</style>
