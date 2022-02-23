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
    <Icon
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
    value: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['focus', 'change', 'click:icon', 'submit'],
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
