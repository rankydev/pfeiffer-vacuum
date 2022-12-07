<template>
  <!-- accordion start -->
  <div class="attribute-buttons">
    <label
      v-for="(item, index) in values"
      :key="index"
      :class="[
        'attribute-buttons__label',
        {
          'attribute-buttons__label--active': internalValue === item.value,
        },
      ]"
    >
      <input
        v-bind="{ ...item, disabled }"
        :checked="internalValue === item.value"
        type="radio"
        name="radio"
        class="attribute-buttons__input"
        @input="setActive(item.value)"
      />
      <span
        :class="[
          'attribute-buttons__text',
          { 'attribute-buttons__text--disabled': disabled },
        ]"
      >
        {{ item.value + ' ' + internalValue }}
      </span>
    </label>
  </div>
  <!-- accordion end -->
</template>
<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'AttributeButtons',
  props: {
    values: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    initialValue: {
      type: undefined,
      default: '',
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    let internalValue = ref(props.initialValue)

    const setActive = (val) => {
      internalValue.value = val
      emit('update', val)
    }

    return { internalValue, setActive }
  },
}
</script>
<style lang="scss">
.attribute-buttons {
  $root: &;

  @apply tw-grid tw-grid-cols-3;
  @apply tw-gap-2;
  @apply tw-overflow-hidden;

  &__label {
    @apply tw-border-pv-grey-80;
    @apply tw-border-2;
    @apply tw-rounded-md;
    @apply tw-py-3 tw-px-4;

    &:hover {
      @apply tw-cursor-pointer;
      @apply tw-bg-pv-red-lighter;
      @apply tw-border-pv-red-lighter;

      #{$root}__text {
        @apply tw-text-pv-white;
      }
    }
  }

  &__text {
    @apply tw-inline-flex;
    @apply tw-items-center;
    @apply tw-justify-center;
    @apply tw-h-full tw-w-full;
    @apply tw-text-base;
    @apply tw-leading-6;
    @apply tw-font-bold;
    @apply tw-text-pv-grey-16;

    &--disabled {
      @apply tw-text-pv-grey-80;
    }
  }

  &__input {
    @apply tw-hidden;

    &:checked {
      + span {
        @apply tw-text-pv-white;
        @apply tw-bg-pv-red;
      }
    }
  }
}
</style>
