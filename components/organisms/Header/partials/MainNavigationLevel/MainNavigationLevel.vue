<template>
  <ul class="primary-nav" :class="`primary-nav--level-${level}`">
    <li
      v-for="(entry, idx) in extendedEntries"
      :key="idx"
      class="primary-nav__element"
      :class="entry.class || ''"
    >
      <Link
        class="primary-nav__link"
        :class="{
          'primary-nav__link--active': activeElement === idx,
          'primary-nav__link--inactive': ![null, idx].includes(activeElement),
        }"
        v-bind="entry"
        :before-navigation="($event) => isMobile || toggleActive($event, idx)"
      >
        <span class="primary-nav__label">{{ entry.label }}</span>
        <Icon
          class="primary-nav__icon"
          :icon="activeElement === idx ? 'expand_less' : 'expand_more'"
          tabindex="0"
          @click.native="toggleActive($event, idx)"
          @keypress.native.enter="toggleActive($event, idx)"
        />
      </Link>
      <AnimatedCollapse speed="fast">
        <!-- start: temporarly until subnavigation is implemented -->
        <div v-if="activeElement === idx" class="primary-nav__sub-nav">
          Some sub navigation {{ idx }}
        </div>
        <!-- end: temporarly until subnavigation is implemented -->
      </AnimatedCollapse>
    </li>
  </ul>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  computed,
  watch,
} from '@nuxtjs/composition-api'

import Link from '~/components/atoms/Link/Link.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse.vue'
import { useMenuStore } from '~/stores/menu'

export default defineComponent({
  components: {
    Icon,
    Link,
    AnimatedCollapse,
  },
  props: {
    navigationEntries: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { app } = useContext()

    const menu = useMenuStore()

    const activeElement = ref(null)
    const isMobile = app.$breakpoints.isMobile

    watch(menu.isActive, (isActive) => {
      if (!isActive) activeElement.value = null
    })

    const toggleActive = function ($event, idx) {
      $event.preventDefault()
      $event.stopPropagation()

      if (activeElement.value === idx) {
        if (!isMobile.value) menu.close()
        activeElement.value = null
      } else {
        if (!isMobile.value) menu.open()
        activeElement.value = idx
      }

      return false
    }

    const home = { label: 'Home', href: '/', class: 'md:tw-hidden' }
    const extendedEntries = computed(() => [home, ...props.navigationEntries])

    return { toggleActive, activeElement, isMobile, extendedEntries }
  },
})
</script>

<style lang="scss">
.primary-nav {
  @apply tw-flex;
  @apply tw-flex-col;

  &__element {
    @apply tw-border-b-2;
    @apply tw-border-pv-grey-96;
    @apply tw-overflow-hidden;
  }

  &__link {
    @apply tw-relative;
    @apply tw-block;
    @apply tw-text-base;
    @apply tw-font-bold;
    @apply tw-leading-6;
    @apply tw-p-4 tw-pr-10;
    @apply tw-text-pv-grey-16;
    @apply tw-duration-200;
    @apply tw-ease-in-out;
    transition-property: color;

    &::after {
      @apply tw-absolute;
      @apply tw--bottom-0 tw-inset-x-0;
      @apply tw-border-t-2;
      @apply tw-rounded-t-sm;
      @apply tw-border-pv-transparent;
      @apply tw-duration-200;
      @apply tw-ease-in-out;
      transition-property: border color;
      content: '';
    }

    &--active {
      &::after {
        @apply tw-border-pv-red;
      }
    }
  }

  &__label {
    @apply tw-block;
    @apply tw-truncate;
  }

  &__icon {
    @apply tw-absolute;
    @apply tw-right-4;
    @apply tw-top-1/2;
    @apply tw--translate-y-1/2;
  }

  @screen md {
    @apply tw-flex-row;

    &__link {
      @apply tw-p-0;
      @apply tw-pb-6;
      @apply tw-font-normal;
      @apply tw-text-xl;
      @apply tw-leading-8;

      &::after {
        @apply tw--bottom-0.5;
        @apply tw-border-t-4;
      }

      &:hover,
      &:focus-visible {
        @apply tw-outline-none;
        @apply tw-text-pv-red-lighter;

        &::after {
          @apply tw-border-pv-red;
        }
      }

      &--inactive {
        @apply tw-text-pv-grey-80;
      }
    }

    &__icon {
      @apply tw-hidden;
    }

    &__element {
      @apply tw-border-0;
      @apply tw-overflow-visible;
      @apply tw-mr-8;
    }

    /* start: temporarly until subnavigation is implemented */
    &__sub-nav {
      @apply tw-absolute;
      @apply tw-top-full;
      @apply tw-left-0 tw-right-0;
      @apply tw-bg-pv-white;
      @apply tw-p-4;
    }

    /* end: temporarly until subnavigation is implemented */
  }
}
</style>
