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
        value === active ? '--active' : ''
      }`"
      @click="$emit('change', value)"
    />
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
  setup() {
    return {
      values: possibleValues,
    }
  },
})
</script>

<style lang="scss">
.category-page-size-selection {
  @apply tw-flex tw-items-center;

  &__text {
    @apply tw-text-xs;
    @apply tw-text-pv-grey-48;
    @apply tw-mr-4;
  }

  &__value {
    @apply tw-mr-4;
    @apply tw-p-2;
    @apply tw-text-pv-grey-48;
    @apply tw-border tw-border-pv-transparent;
    @apply tw-rounded;

    &:hover {
      @apply tw-border tw-border-pv-red-lighter;
      @apply tw-bg-pv-red-lighter;
    }

    &--active {
      @apply tw-rounded-none;
      border-bottom: 2px solid #dd1541;

      &:hover {
        @apply tw-rounded;
      }
    }
  }

  .button--plain.button--secondary {
    &:hover {
      color: white;
    }
  }
}
</style>
