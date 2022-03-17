<template>
  <div class="accordion">
    <div v-for="(entry, idx) in accordionEntries" :key="idx">
      <component :is="level" class="accordion__heading">
        <button
          class="accordion__button"
          :class="[level, { 'accordion__button--active': isActive(idx) }]"
          aria-controls="myID-1"
          :aria-expanded="isActive(idx)"
          @click="toggleActive(idx)"
        >
          <span class="accordion__label">{{ entry.label }}</span>
          <Icon
            class="accordion__icon"
            :size="level"
            :icon="isActive(idx) ? 'expand_less' : 'expand_more'"
          />
        </button>
      </component>
      <AnimatedCollapse speed="fast">
        <div v-show="isActive(idx)" id="myID-1" class="accordion__content">
          <nuxt-dynamic
            v-for="item in entry.items"
            :key="item._uid"
            v-editable="item"
            :name="item.uiComponent || item.component"
            v-bind="item"
          />
        </div>
      </AnimatedCollapse>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    /**
     * List of accordion elements
     */
    accordionEntries: {
      type: Array,
      default: () => [],
    },
    /**
     * The heading tag
     */
    level: {
      type: String,
      default: 'h3',
      validator: (val) => ['h3', 'h4', 'h5', 'h6'].includes(val),
    },
  },
  setup() {
    const active = ref(null)

    const toggleActive = (idx) =>
      (active.value = active.value === idx ? null : idx)
    const isActive = (idx) => idx === active.value

    return { isActive, toggleActive }
  },
})
</script>

<style lang="scss">
.accordion {
  @apply tw-flex;
  @apply tw-flex-col;

  @apply tw-border-b-2;
  @apply tw-border-pv-grey-96;
  @apply tw-overflow-hidden;
  width: 300px;

  &__heading {
    @apply tw-border-t-2;
    @apply tw-border-pv-grey-96;
    @apply tw-overflow-hidden;
  }

  &__label {
    @apply tw-block;
    @apply tw-truncate;
  }

  &__icon {
    @apply tw-ml-4;
  }

  &__button {
    @apply tw-flex;
    @apply tw-justify-between;
    @apply tw-items-center;
    @apply tw-mt-5 tw-mb-6;
    @apply tw-w-full;

    @apply tw-duration-200;
    @apply tw-ease-in-out;
    transition-property: color;

    &--active {
      & .accordion__label {
        @apply tw-text-pv-red;
      }
    }

    &:hover,
    &:focus-visible {
      @apply tw-text-pv-red-lighter;
    }
  }

  &__content {
    @apply tw-overflow-hidden;
    @apply tw-mb-6;
  }
}
</style>
