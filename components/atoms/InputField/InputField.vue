<template>
  <div class="pv-input">
    <input
      v-model="internalValue"
      class="pv-input__element"
      :class="{ 'pv-input__element--icon': icon }"
      :placeholder="placeholder"
      @keypress.enter="$emit('submit', $event)"
      @focus="$emit('focus', true)"
      @blur="$emit('focus', false)"
      @input="$emit('change', internalValue)"
    />
    <icon
      v-if="icon"
      class="pv-input__icon"
      :icon="icon"
      @click.native="$emit('click:icon', $event)"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import Icon from '~/components/atoms/Icon/Icon.vue'
import { ref } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {
    Icon,
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
    'change',
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

    return {
      internalValue,
    }
  },
})
</script>

<style lang="scss">
.pv-input {
  @apply tw-relative;

  &__icon {
    @apply tw-absolute;
    @apply tw-top-1/2 tw-right-2;
    @apply tw-cursor-pointer tw-text-pv-grey-64;
    transform: translateY(-50%);
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
  }
}
</style>
