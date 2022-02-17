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
      @input="$emit('change', value)"
    />
    <PvIcon
      v-if="icon"
      class="pv-input__icon"
      :icon="icon"
      @click="$emit('click:icon', $event)"
    />
  </div>
</template>

<script setup>
import PvIcon from '~/components/atoms/Icon/Icon.vue'
import { ref } from '@vue/composition-api'

defineEmits(['focus', 'change', 'click:icon', 'submit'])

const props = defineProps({
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
})

const internalValue = ref(props.value)
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
