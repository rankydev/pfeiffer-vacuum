<template>
  <div class="pv-password">
    <PvLabel :label="label" />
    <div class="pv-password__wrapper">
      <input
        v-model="internalValue"
        v-bind="{ placeholder, required, disabled }"
        :type="inputType"
        class="pv-password__element pv-password__element--icon"
        :class="[
          !!validation.getError()
            ? 'pv-password__element--vuelidated'
            : 'pv-password__element--NotValidated',
          showValidationCriterias
            ? 'pv-password__element--validated'
            : 'pv-password__element--NotValidated',
        ]"
        :placeholder="placeholder"
        @keypress.enter="$emit('submit', $event)"
        @focus="$emit('focus', true)"
        @blur="$emit('focus', false)"
        @input="
          $emit('update', internalValue)
          validation.validateInput()
        "
      />
      <Icon
        v-if="validation.getError()"
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
    <ErrorMessage
      v-if="!!validation.getError()"
      :class="{ 'pv-password__error-message': showValidationCriterias }"
      :error-message="validation.getError()"
    />
    <div v-if="showValidationCriterias" class="pv-password__strength-indicator">
      <div
        class="pv-password__strength-indicator--inner"
        :class="{
          'pv-password__strength-indicator--full': indicatorWidthFull,
        }"
        :style="{ width: indicatorWidth }"
      />
    </div>
    <ul v-if="showValidationCriterias" class="pv-password__rules">
      <li class="pv-password__rules--entry" :class="{ fulfilled: minLength }">
        <Icon size="xsmall" :icon="minLength ? 'check_circle' : 'error'" />
        {{ $t('form.password.minLength') }}
      </li>
      <li
        class="pv-password__rules--entry"
        :class="{ fulfilled: hasCapitalAndLowercase }"
      >
        <Icon
          size="xsmall"
          :icon="hasCapitalAndLowercase ? 'check_circle' : 'error'"
        />
        {{ $t('form.password.capitalLetter') }}
      </li>
      <li class="pv-password__rules--entry" :class="{ fulfilled: hasDigit }">
        <Icon size="xsmall" :icon="hasDigit ? 'check_circle' : 'error'" />
        {{ $t('form.password.digit') }}
      </li>
      <li
        v-if="maxLengthReached"
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
import { ref, computed, defineComponent, watch } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'
import ErrorMessage from '~/components/atoms/FormComponents/partials/ErrorMessage/ErrorMessage'
import PvLabel from '~/components/atoms/FormComponents/partials/PvLabel/PvLabel'
import { useInputValidator } from '~/composables/useValidator'

export default defineComponent({
  components: {
    Icon,
    PvLabel,
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
     * The text displayed over the form component via PvLabel component
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
     * Defines if the password is visible or not
     */
    visibility: {
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
    /**
     * determines whether a validation can be executed
     */
    validate: {
      type: Boolean,
      default: false,
    },
    /**
     * Defines if the password should be validated or not
     */
    showValidationCriterias: {
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

    const validation = ref(useInputValidator(props.rules, internalValue))

    watch(
      () => props.validate,
      (value) => {
        if (value === true) {
          validation.value.validateInput()
        }
      }
    )

    const inputStylings = ref([
      props.showValidationCriterias || !!validation.value.getError()
        ? 'pv-password__element--validated'
        : 'pv-password__element--NotValidated',
    ]).value

    const changeVisibility = () => {
      inputType.value = inputType.value === 'password' ? 'text' : 'password'
      return inputType.value
    }

    const minLength = computed(
      () => internalValue.value && internalValue.value.length >= 8
    )

    const hasCapitalAndLowercase = computed(() => {
      return (
        new RegExp('.*[A-Z].*').test(internalValue.value) &&
        new RegExp('.*[a-z].*').test(internalValue.value)
      )
    })

    const maxLengthReached = computed(() => internalValue.value.length > 128)

    const hasDigit = computed(() => {
      return new RegExp('\\d').test(internalValue.value)
    })

    const indicatorWidth = computed(() => {
      let result = 0
      if (minLength.value) {
        result += 33
      }
      if (hasCapitalAndLowercase.value) {
        result += 33
      }
      if (hasDigit.value) {
        result += 34
      }
      return result + '%'
    })

    const indicatorWidthFull = computed(
      () => indicatorWidth.value.toString() === '100%'
    )

    return {
      internalValue,
      inputType,
      inputStylings,
      changeVisibility,
      minLength,
      maxLengthReached,
      hasCapitalAndLowercase,
      hasDigit,
      indicatorWidth,
      indicatorWidthFull,
      validation,
    }
  },
})
</script>

<style lang="scss">
.pv-password {
  @apply tw-relative;

  &__wrapper {
    @apply tw-relative;

    ::-ms-reveal {
      @apply tw-hidden;
    }
  }

  &__icon {
    @apply tw-absolute;
    @apply tw-top-1/2 tw-right-2;
    @apply tw-cursor-pointer tw-text-pv-grey-64;
    transform: translateY(-50%);

    &--error {
      @apply tw-mr-9;

      &:focus {
        @apply tw-text-pv-red;
      }
    }

    &--visibility {
      &:hover,
      &:focus {
        @apply tw-text-pv-grey-16;
      }
    }
  }

  &__error-message {
    @apply tw-rounded-none;
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

    &--vuelidated {
      @apply tw-rounded-b-none;
      @apply tw-rounded-t-md;
      @apply tw-border-pv-red;

      &::-webkit-credentials-auto-fill-button {
        margin-right: 38px;
      }

      &:focus {
        @apply tw-border-t-pv-black;
        @apply tw-border-x-pv-black;
      }
    }

    &--validated {
      border-bottom-style: none;
      @apply tw-rounded-b-none;
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
