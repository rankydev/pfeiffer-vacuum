<template>
  <div class="button-group">
    <label
      v-for="(item, index) in values"
      :key="index"
      class="button-group__label"
    >
      <input
        v-bind="{ ...item }"
        type="radio"
        name="radio"
        class="button-group__input"
        @input="$emit('update', item.value)"
      />
      <span class="button-group__text">{{ item.label }}</span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'ButtonGroup',
  props: {
    values: {
      type: Array,
      required: true,
      validator: (val) => val.length > 1 && val.length < 6,
    },
  },
  emits: ['update'],
}
</script>
<style lang="scss">
.button-group {
  @apply tw-flex;
  @apply tw-h-12;
  @apply tw-border-pv-grey-80;
  @apply tw-border-2;
  @apply tw-rounded-md;
  @apply tw-overflow-hidden;

  &__text {
    @apply tw-inline-flex;
    @apply tw-items-center;
    @apply tw-justify-center;
    @apply tw-h-full tw-w-full;
    @apply tw-text-sm;
    @apply tw-leading-4;
    @apply tw-font-bold;
    @apply tw-text-pv-grey-16;

    @screen lg {
      @apply tw-text-base;
      @apply tw-leading-6;
    }
  }

  &__label {
    @apply tw-grow;
    @apply tw-border-r-pv-grey-80;
    @apply tw-border-r-2;

    &:hover {
      @apply tw-cursor-pointer;
    }

    &:last-of-type {
      @apply tw-border-r-0;
    }
  }

  &__text {
    @apply tw-inline-flex;
    @apply tw-items-center;
    @apply tw-justify-center;
    @apply tw-h-full tw-w-full;
    @apply tw-text-sm;
    @apply tw-leading-4;
    @apply tw-font-bold;
    @apply tw-text-pv-grey-16;

    @screen lg {
      @apply tw-text-base;
      @apply tw-leading-6;
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
