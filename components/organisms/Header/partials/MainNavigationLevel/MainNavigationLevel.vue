<template>
  <div class="primary-nav" :class="`primary-nav--level-${level}`">
    <Link
      v-for="(entry, idx) in navigationEntries"
      :key="idx"
      :ref="`link-${idx}`"
      v-bind="entry"
      class="primary-nav__link"
      :before-navigation="($event) => preventRouting($event, idx)"
    >
      <span class="primary-nav__link-activator">
        <span class="primary-nav__link-label">{{ entry.label }}</span>
        <Icon
          class="primary-nav__link-icon"
          :icon="activeElement === idx ? 'expand_less' : 'expand_more'"
          tabindex="0"
          @click.native="toggleActive($event, idx)"
          @keypress.native.enter="toggleActive($event, idx)"
        />
      </span>
      <AnimatedCollapse speed="fast">
        <div v-if="activeElement === idx" class="primary-nav__sub-nav">
          Some sub navigation
        </div>
      </AnimatedCollapse>
    </Link>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'

import Link from '~/components/atoms/Link/Link.vue'
import AnimatedCollapse from '~/components/atoms/AnimatedCollapse/AnimatedCollapse.vue'
import { useMenuStore } from '~/stores/menu'

export default defineComponent({
  components: {
    Link,
    AnimatedCollapse,
  },
  props: {
    navigationEntries: {
      type: Array,
      default: () => [],
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  setup(props, setupContext) {
    const { app } = useContext()

    const menu = useMenuStore()

    const activeElement = ref(null)
    const isMobile = app.$breakpoints.isMobile

    const openMenu = (idx) => {
      const ref = setupContext.refs?.[`link-${idx}`]?.[0]?.$el

      if (!isMobile.value) menu.open(ref)
      activeElement.value = idx
    }

    const closeMenu = () => {
      if (!isMobile.value) menu.close()
      activeElement.value = null
    }

    watch(menu, (value) => {
      if (!value.isActive) closeMenu()
    })

    const toggleActive = function ($event, idx) {
      $event.preventDefault()
      $event.stopPropagation()
      activeElement.value === idx ? closeMenu() : openMenu(idx)
      return false
    }

    const preventRouting = ($event, idx) => {
      return isMobile.value || toggleActive($event, idx)
    }

    return { preventRouting, toggleActive, activeElement }
  },
})
</script>

<style lang="scss">
.primary-nav {
  &__link {
    @apply tw-border-b-2;
    @apply tw-border-pv-grey-96;
    @apply tw-overflow-hidden;
  }

  &__link-activator {
    @apply tw-relative;
    @apply tw-block;
    @apply tw-text-base;
    @apply tw-leading-6;
    @apply tw-m-4 tw-pr-6;
    @apply tw-text-pv-grey-16;
    @apply tw-duration-200;
    @apply tw-ease-in-out;
    transition-property: color;
  }

  &__link-label {
    @apply tw-block;
    @apply tw-truncate;
  }

  &__link-icon {
    @apply tw-absolute;
    @apply tw-right-0;
    @apply tw-top-0;
  }

  @screen md {
    &__link-activator {
      @apply tw-m-0 tw-pr-0;
      @apply tw-pb-6;
      @apply tw-text-xl;
      @apply tw-leading-8;

      &::after {
        @apply tw-absolute;
        @apply tw--bottom-0.5 tw-inset-x-0;
        @apply tw-border-t-4;
        @apply tw-rounded-t-sm;
        @apply tw-border-pv-transparent;
        @apply tw-duration-200;
        @apply tw-ease-in-out;
        transition-property: border;
        content: '';
      }
    }

    &__link-icon {
      @apply tw-hidden;
    }

    &__link {
      @apply tw-border-0;
      @apply tw-overflow-visible;
      @apply tw-mr-8;

      &:hover,
      &:focus,
      &:focus-within {
        outline: none;

        & .primary-nav__link-activator {
          @apply tw-text-pv-red-lighter;

          &::after {
            @apply tw-border-pv-red;
          }
        }
      }
    }

    &__sub-nav {
      @apply tw-absolute;
      @apply tw-top-full;
      @apply tw-left-0 tw-right-0;
      @apply tw-bg-pv-white;
      @apply tw-p-4;
      @apply tw-mt-0.5;
    }
  }
}
</style>
