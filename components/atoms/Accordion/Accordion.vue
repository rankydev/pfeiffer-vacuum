<template>
  <div class="accordion">
    <div
      v-for="(entry, idx) in accordionEntries"
      :key="idx"
      :class="{ 'tw-pb-6': isActive(idx) }"
    >
      <component :is="level === 'h3' ? level : 'p'" class="accordion__heading">
        <button
          class="accordion__button"
          :class="[
            `tw-${level}`,
            { 'accordion__button--active': isActive(idx) },
          ]"
          :aria-controls="`accordion-${idx}`"
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
      <AnimatedCollapse speed="medium">
        <div
          v-show="isActive(idx)"
          :id="`accordion-${idx}`"
          class="accordion__content"
        >
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
      default: 'paragraph',
      validator: (val) => ['h3', 'paragraph'].includes(val),
    },

    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    if (props.multiple) {
      const filterActives = (memo, ele, idx) =>
        ele.isActive === true ? [...memo, idx] : memo
      const initial = props.accordionEntries.reduce(filterActives, [])

      const active = ref([...initial])
      const hasIdx = (idx) => active.value.includes(idx)
      const findIdx = (idx) => active.value.indexOf(idx)
      const removeIdx = (idx) => active.value.splice(findIdx(idx), 1)
      const addIdx = (idx) => active.value.push(idx)

      return {
        toggleActive: (idx) => (hasIdx(idx) ? removeIdx(idx) : addIdx(idx)),
        isActive: hasIdx,
      }
    } else {
      const findIdx = (ele) => ele.isActive === true
      const initial = props.accordionEntries.findIndex(findIdx)

      const active = ref(initial)
      const hasIdx = (idx) => active.value === idx

      return {
        toggleActive: (idx) => (active.value = hasIdx(idx) ? null : idx),
        isActive: (idx) => idx === active.value,
      }
    }
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
    @apply tw-w-full;
    @apply tw-py-4;

    @apply tw-duration-200;
    @apply tw-ease-in-out;
    transition-property: color;

    &--active {
      @apply tw-text-pv-red;
    }

    &:hover,
    &:focus-visible {
      @apply tw-text-pv-red-lighter;
    }

    &.tw-h3 {
      @screen lg {
        @apply tw-py-6;
      }
    }

    &.tw-paragraph {
      @apply tw-font-bold;
    }
  }

  &__content {
    @apply tw-overflow-hidden;
  }
}
</style>
