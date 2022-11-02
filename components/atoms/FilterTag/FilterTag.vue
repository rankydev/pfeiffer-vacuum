<template>
  <button
    class="filter-tag"
    :class="{ 'filter-tag--suggestion': isSuggestion }"
    @click="$emit('click')"
  >
    <span class="filter-tag__text">
      {{ `${filter}: ` }}
      <span class="filter-tag__value" v-html="value"></span>
    </span>
    <Icon
      class="filter-tag__icon"
      :class="{ 'filter-tag__icon--suggestion': isSuggestion }"
      :icon="isSuggestion ? 'add' : 'close'"
      size="xsmall"
    />
  </button>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    filter: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    isSuggestion: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
})
</script>

<style lang="scss">
.filter-tag {
  all: unset;

  @apply tw-inline-flex;
  @apply tw-gap-1;
  @apply tw-p-2;
  @apply tw-items-center;
  @apply tw-cursor-pointer;
  @apply tw-justify-between;
  @apply tw-rounded;
  @apply tw-text-xs;
  @apply tw-leading-4;

  @apply tw-text-pv-red;
  @apply tw-shadow-border-red;

  &--suggestion {
    @apply tw-text-pv-grey-16;
    @apply tw-shadow-border-grey-16;
  }

  &:hover,
  &:focus {
    @apply tw-shadow-border-red-lighter;
    @apply tw-text-pv-red-lighter;
    @apply tw-bg-pv-red-lighter;
    @apply tw-bg-opacity-10;
  }

  &__value {
    @apply tw-font-bold;
  }

  &__icon {
    &--suggestion {
      @apply tw-order-first;
    }
  }
}
</style>
