<template>
  <div class="forminput">
    <!-- <TextArea
      label="Hallo FormInput"
      placeholder="hold this place"
      :disabled="disabled"
    /> -->
    <input
      :name="'textarea'"
      v-bind="{ text, placeholder, required, disabled }"
      class="textarea__input"
      :class="hasError ? 'textarea__error' : 'textarea__correct'"
      @focus="$emit('focus', true)"
      @blur="$emit('focus', false)"
      @click="$emit('test', true)"
    />
    <div v-if="hasError" class="forminput__error">Error Message</div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import TextArea from '~/components/atoms/FormComponents/TextArea/TextArea.vue'

export default defineComponent({
  name: 'Input',
  components: {
    // TextArea,
  },
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
    hasError: {
      type: Boolean,
      default: true,
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
    'test',
    'update',
  ],
  setup(props) {
    // const emit = defineEmits(['focus', 'test'])
    // emit('test', 'focus')
  },
})
</script>

<style lang="scss">
.forminput {
  &__error {
    @apply tw-block;
    @apply tw-px-3;
    @apply tw-py-2;
    @apply tw-border-2;
    @apply tw-rounded-b;
    @apply tw-border-pv-red;
    @apply tw-bg-pv-red;
    @apply tw-text-pv-white;
    @apply tw-w-full;
  }
}

.textarea {
  &__right-label {
    @apply tw-relative;
    @apply tw-float-right;
    @apply tw-text-pv-grey-64;
  }

  &__input {
    @apply tw-block;
    @apply tw-px-3;
    @apply tw-py-2;
    @apply tw-border-2;
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

  &__error {
    @apply tw-rounded-t;
    @apply tw-border-pv-red;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  &__correct {
    @apply tw-rounded-t;
    @apply tw-border-pv-grey-80;
  }
}
</style>
