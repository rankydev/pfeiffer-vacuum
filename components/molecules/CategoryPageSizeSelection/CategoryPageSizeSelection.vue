<template>
  <div class="category-page-size-selection">
    <span class="category-page-size-selection__text">
      {{ $t('category.itemsPerPage') }}
    </span>
    <Button
      v-for="value in values"
      :key="`category-page-size-selection-${value}`"
      :label="`${value}`"
      variant="secondary"
      shape="plain"
      class="category-page-size-selection__value"
      :class="`category-page-size-selection__value${
        isActiveValue(value) ? '--active' : ''
      }`"
      :disabled="isActiveValue(value)"
      @click="$emit('change', value)"
    />
  </div>
</template>
<script>
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'

const possibleValues = [9, 30, 90, 120]

export default defineComponent({
  name: 'CategoryPageSizeSelection',
  components: { Button },
  props: {
    active: {
      type: Number,
      required: true,
      validator: (val) => possibleValues.includes(val),
    },
  },
  emits: ['change'],
  setup(props) {
    const { active } = toRefs(props)

    const isActiveValue = (val) => {
      return active.value === val
    }

    return {
      values: possibleValues,
      isActiveValue,
    }
  },
})
</script>

<style lang="scss">
@import '/assets/scss/mixins';

.category-page-size-selection {
  @apply tw-flex tw-items-center;

  &__text {
    @apply tw-text-xs;
    @apply tw-text-pv-grey-48;
    @apply tw-mr-2;
  }

  &__value {
    @apply tw-flex tw-justify-center;
    @apply tw-w-10;
    @apply tw-py-2;
    @apply tw-border-2 tw-border-pv-transparent;
    @apply tw-rounded;
    @apply tw-text-pv-grey-48;
    -webkit-text-fill-color: var(--pv-grey-48);
    flex-basis: auto;

    &:hover {
      @apply tw-border-2 tw-border-pv-red-lighter;
      @apply tw-bg-pv-red-lighter;
      @apply tw-cursor-pointer;

      .button__label {
        @apply tw-text-pv-white;
        -webkit-text-fill-color: var(--pv-white);
      }
    }

    .button__label {
      @apply tw-text-pv-grey-48;
      -webkit-text-fill-color: var(--pv-grey-48);
    }

    &--active {
      @apply tw-relative;

      .button__label {
        @apply tw-text-pv-red;
        -webkit-text-fill-color: var(--pv-red);
      }

      @include rounded-border-bottom;

      &:hover {
        @apply tw-border-2 tw-border-pv-transparent;
        @apply tw-rounded-none;
        @apply tw-bg-pv-white;
        @apply tw-cursor-default;

        .button__label {
          @apply tw-text-pv-red;
          -webkit-text-fill-color: var(--pv-red);
        }
      }
    }
  }
}
</style>
