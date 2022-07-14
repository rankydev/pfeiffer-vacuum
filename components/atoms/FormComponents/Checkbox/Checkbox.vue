<template>
  <label :class="['checkbox', { 'checkbox--disabled': disabled }]">
    <input
      v-bind="{ checked, disabled }"
      type="checkbox"
      class="checkbox__input"
      @input="$emit('update', $event.target.checked)"
    />
    <Icon icon="check" class="checkbox__tick" />
    {{ label }}
  </label>
</template>
<script>
import Icon from '~/components/atoms/Icon/Icon'

export default {
  name: 'Checkbox',
  components: {
    Icon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update'],
}
</script>
<style lang="scss">
.checkbox {
  @apply tw-flex;
  @apply tw-relative;
  @apply tw-items-center;
  @apply tw-text-pv-grey-16;
  @apply tw-text-base;

  &--disabled {
    @apply tw-text-pv-grey-48;
  }

  &:hover {
    @apply tw-cursor-pointer;
  }

  &__tick {
    @apply tw-block;
    @apply tw-absolute;
    @apply tw-left-0 tw-top-0;
    @apply tw-text-pv-white;
    @apply tw-opacity-0;
    @apply tw-transition-opacity tw-duration-150 tw-ease-in;
  }

  &__input {
    @apply tw-appearance-none;
    @apply tw-h-6 tw-w-6;
    @apply tw-mr-2;
    @apply tw-border-2 tw-border-pv-red;
    @apply tw-rounded;
    @apply tw-transition-colors tw-duration-100;

    &:hover {
      @apply tw-cursor-pointer;
    }

    &:focus {
      @apply tw-border tw-border-pv-red-lighter;
      @apply tw-ring-0;
      @apply tw-text-pv-red-lighter;
      @apply tw-shadow-border-red-lighter;

      // safari fix to prevent focus outline
      outline: 0;
    }

    &:disabled {
      @apply tw-border-pv-grey-64;
    }

    &:checked {
      @apply tw-bg-pv-red;

      &:disabled {
        @apply tw-bg-pv-grey-64;
      }
    }

    &:checked + .checkbox__tick {
      @apply tw-opacity-100;
    }
  }
}
</style>
