<template>
  <div class="pv-password">
    <Label :label="label" />
    <div class="pv-password__wrapper">
      <input
        v-model="internalValue"
        v-bind="{ placeholder, required, disabled }"
        :type="inputType"
        class="pv-password__element pv-password__element--icon"
        :class="[
          validate
            ? 'pv-password__element--validated'
            : 'pv-password__element--NotValidated',
          hasError ? 'pv-password__element--error' : '',
        ]"
        :placeholder="placeholder"
        @keypress.enter="$emit('submit', $event)"
        @focus="$emit('focus', true)"
        @blur="$emit('focus', false)"
        @input="$emit('update', internalValue)"
      />
      <Icon
        v-if="hasError"
        class="pv-password__icon"
        :class="'pv-password__icon--error'"
        :icon="'error_outline'"
        @click.native="$emit('click:icon', $event)"
      />
      <Icon
        class="pv-password__icon"
        :class="{ 'pv-password__icon--visibility': !disabled }"
        icon="visibility"
        @click.native="$emit('click:icon', changeVisibility())"
      />
    </div>
    <ErrorMessage v-if="hasError" :error-message="errorMessage" />
    <div v-if="validate" class="pv-password__strength-indicator">
      <div
        class="pv-password__strength-indicator--inner"
        :class="{
          'pv-password__strength-indicator--full':
            indicatorWidth().toString() === '100%',
        }"
        :style="{ width: indicatorWidth() }"
      />
    </div>
    <ul v-if="validate" class="pv-password__rules">
      <li class="pv-password__rules--entry" :class="{ fulfilled: minLength() }">
        <Icon size="xsmall" icon="check_circle" />
        {{ $t('form.password.minLength') }}
      </li>
      <li
        class="pv-password__rules--entry"
        :class="{ fulfilled: hasCapitalAndLowercase() }"
      >
        <Icon size="xsmall" icon="check_circle" />
        {{ $t('form.password.capitalLetter') }}
      </li>
      <li class="pv-password__rules--entry" :class="{ fulfilled: hasDigit() }">
        <Icon size="xsmall" icon="check_circle" />
        {{ $t('form.password.digit') }}
      </li>
      <li
        v-if="maxLengthReached()"
        class="pv-password__rules--entry"
        :class="'pv-password__rules--entryTooLong'"
      >
        <Icon size="xsmall" icon="info" />
        {{ $t('form.password.tooLong') }}
      </li>
    </ul>
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
    /**
     * Defines if the password is visible or not
     */
    visibility: {
      type: Boolean,
      default: false,
    },
    /**
     * Defines if the password should be validated or not
     */
    validate: {
      type: Boolean,
      default: false,
    },
    /**
     * Defines if the password is too long or not
     */
    tooLong: {
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
    const inputType = ref(props.visibility ? 'text' : 'password')

    function changeVisibility() {
      if (inputType.value === 'password') {
        inputType.value = 'text'
      } else {
        inputType.value = 'password'
      }
    }

    function minLength() {
      return this.internalValue && this.internalValue.length >= 8
    }

    function maxLengthReached() {
      return this.internalValue.length > 128
    }

    function hasCapitalAndLowercase() {
      return (
        new RegExp('.*[A-Z].*').test(this.internalValue) &&
        new RegExp('.*[a-z].*').test(this.internalValue)
      )
    }

    function hasDigit() {
      return new RegExp('\\d').test(this.internalValue)
    }

    function indicatorWidth() {
      let result = 0

      if (this.internalValue && this.internalValue.length >= 8) {
        result += 33
      }

      if (this.hasCapitalAndLowercase()) {
        result += 33
      }

      if (this.hasDigit()) {
        result += 34
      }

      return result + '%'
    }

    return {
      internalValue,
      inputType,
      changeVisibility,
      minLength,
      maxLengthReached,
      hasCapitalAndLowercase,
      hasDigit,
      indicatorWidth,
    }
  },
})
</script>

<style lang="scss">
.pv-password {
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
      margin-right: 35px;
    }

    &--visibility {
      &:hover,
      &:focus {
        @apply tw-text-pv-grey-16;
      }
    }
  }

  &__element {
    @apply tw-block;
    @apply tw-w-full;
    @apply tw-text-pv-black;
    @apply tw-px-3;
    @apply tw-py-2;
    @apply tw-border-2;
    @apply tw-border-pv-grey-80;

    &--NotValidated {
      @apply tw-rounded-md;

      &:focus {
        @apply tw-border-pv-black;
      }
    }

    &--validated {
      @apply tw-rounded-t-md;
      border-bottom-style: none;

      &:focus {
        @apply tw-border-t-pv-black;
        @apply tw-border-x-pv-black;
      }
    }

    &:focus {
      @apply tw-ring-0;
      @apply tw-outline-0;
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

    &--icon {
      @apply tw-pr-10;
    }

    &--error {
      @apply tw-rounded-t-md;
      @apply tw-border-pv-red;
      @apply tw-rounded-b-none;
      @apply tw-text-pv-red;

      &:focus {
        @apply tw-border-pv-red;
      }

      &::-webkit-credentials-auto-fill-button {
        margin-right: 38px;
      }
    }
  }

  &__strength-indicator {
    @apply tw-h-2;
    @apply tw-w-full;
    @apply tw-mb-4;
    @apply tw-bg-pv-grey-80;
    @apply tw-rounded-b-md;

    &--inner {
      @apply tw-bg-pv-green;
      @apply tw-h-2;
      border-bottom-left-radius: 6px;
      transition: all 0.5s ease-in;
    }

    &--full {
      border-bottom-right-radius: 6px;
    }
  }

  &__rules {
    &--entry {
      @apply tw-text-pv-grey-64;
      @apply tw-flex tw-items-center;
      @apply tw-text-xs;
      @apply tw-leading-4;
      gap: 5.33px;

      &.fulfilled {
        @apply tw-text-pv-green;
      }
    }

    &--entryTooLong {
      @apply tw-text-pv-red;
    }
  }
}
</style>
