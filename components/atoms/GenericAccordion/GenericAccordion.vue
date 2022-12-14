<template>
  <div class="accordion" :class="{ 'accordion--tab-styles': useTabStyles }">
    <div
      v-for="(entry, idx) in accordionEntries"
      :key="idx"
      :class="{ 'tw-scroll-pb-6': isActive(idx) }"
    >
      <component :is="level === 'h3' ? level : 'p'" class="accordion__heading">
        <button
          class="accordion__button"
          :class="[
            `tw-${level}`,
            {
              'accordion__button--active': isActive(idx),
              'accordion__button--disabled': entry.disabled,
            },
          ]"
          :aria-controls="`accordion-${idx}`"
          :aria-expanded="isActive(idx)"
          :disabled="entry.disabled"
          @click="toggleActive(idx)"
        >
          <div class="tw-flex">
            <Icon v-if="entry.icon" class="tw-mr-2" :icon="entry.icon" />
            <span class="accordion__label">{{ entry.label }}</span>
          </div>
          <LoadingSpinner v-if="loading" color="red" size="small" />
          <Icon
            v-else
            class="accordion__icon"
            :size="level"
            :icon="
              isActive(idx)
                ? 'expand_less'
                : entry.expandIcon
                ? entry.expandIcon
                : 'expand_more'
            "
          />
        </button>
      </component>
      <AnimatedCollapse speed="medium">
        <div
          v-if="isActive(idx)"
          :id="`accordion-${idx}`"
          class="accordion__content"
        >
          <slot :name="entry.slotName" />
        </div>
      </AnimatedCollapse>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'

export default defineComponent({
  components: {
    LoadingSpinner,
  },
  props: {
    /**
     * List of accordion elements
     * properties for each entry<br>
     * <b>label:string</b> // displayed in tab header <br>
     * <b>slotName:string</b> // unique identifier for your slot<br>
     * <b>isActive:boolean</b> // items which set this to false will not be displayed<br>
     * <b>disabled:boolean</b> // those items are displayed but cannot be opened<br>
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
    /**
     * Allow multiple open items at the same time
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * Use the tab layout instead of the standard accordion layout
     */
    useTabStyles: {
      type: Boolean,
      default: false,
    },
    loading: {
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
  $root: &;

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
    -webkit-tap-highlight-color: transparent;

    @apply tw-duration-200;
    @apply tw-ease-in-out;
    transition-property: color;

    &--active {
      #{$root}__label {
        @apply tw-text-pv-red;
      }
    }

    &:hover,
    &:focus-visible {
      @apply tw-text-pv-red-lighter;
    }

    &--disabled {
      @apply tw-text-pv-grey-48;

      &:hover,
      &:focus-visible {
        @apply tw-text-pv-grey-48;
      }
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

    .paragraph-section,
    .image-with-description,
    .button {
      @apply tw-mb-4;

      @screen md {
        @apply tw-mb-6;
      }
    }
  }

  &--tab-styles {
    @apply tw-border-b-0;

    // negative values lead to compiling errors
    margin: 0 -1.25rem;

    .accordion__heading {
      @apply tw-border-t-0;
      @apply tw-my-1;
    }

    .accordion__button {
      @apply tw-bg-pv-grey-88;
      @apply tw-px-5;

      &--active {
        @apply tw-text-pv-white;
        @apply tw-bg-pv-red;

        .accordion__label {
          @apply tw-text-pv-white;
        }
      }
    }

    .accordion__content {
      @apply tw-px-5;
    }
  }
}
</style>
