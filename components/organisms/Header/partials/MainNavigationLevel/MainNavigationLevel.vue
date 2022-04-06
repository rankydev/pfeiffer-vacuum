<template>
  <ul
    :class="[
      `primary-nav-${level}`,
      activeElement ? `primary-nav-${level}--passive` : '',
    ]"
  >
    <li
      v-for="(entry, idx) in extendedEntries"
      :key="idx"
      :class="[`primary-nav-${level}__element`, entry.class || '']"
    >
      <Link
        :class="{
          [`primary-nav-${level}__link`]: true,
          [`primary-nav-${level}__link--inactive`]: activeElement !== idx,
          [`primary-nav-${level}__link--active`]: activeElement === idx,
        }"
        v-bind="entry"
        :before-navigation="($event) => isMobile || toggleActive($event, idx)"
      >
        <span :class="`primary-nav-${level}__label`">{{ entry.label }}</span>
        <Icon
          :class="`primary-nav-${level}__icon`"
          :icon="activeElement === idx ? 'expand_less' : 'expand_more'"
          tabindex="0"
          @click.native="toggleActive($event, idx)"
          @keypress.native.enter="toggleActive($event, idx)"
        />
      </Link>
      <AnimatedCollapse speed="fast">
        <div
          v-if="activeElement === idx"
          :class="`primary-nav-${level}__sub-nav`"
        >
          <MainNavigationLevel
            :level="level + 1"
            :navigation-entries="navigationEntries"
          />
        </div>
      </AnimatedCollapse>
    </li>
    <template v-if="level > 0">
      <li v-if="isMobile">
        <Link href="/" :class="[`primary-nav-${level}__link`]">
          <span :class="`primary-nav-${level}__label`">All Products</span>
          <Icon
            :class="`primary-nav-${level}__icon`"
            icon="arrow_forward"
            tabindex="0"
          />
        </Link>
      </li>
      <li :class="`primary-nav-${level}__buttons`">
        <template v-if="!activeElement">
          <Button
            v-if="!isMobile"
            class="tw-hidden md:tw-block"
            variant="secondary"
            shape="outlined"
            size="small"
            label="Übersicht"
          />
          <Button size="small" label="Shop" />
        </template>
      </li>
    </template>
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
  name: 'MainNavigationLevel',
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

    return {
      toggleActive,
      activeElement,
      isMobile,
      extendedEntries,
    }
  },
})
</script>

<style lang="scss">
.primary-nav-0 {
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
      transition-property: border, color;
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

      &:focus-visible {
        @apply tw-outline-none;
        @apply tw-text-pv-red-lighter;

        &::after {
          @apply tw-border-pv-red;
        }
      }

      &:hover {
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

    &__sub-nav {
      @apply tw-absolute;
      @apply tw-top-full;
      @apply tw-overflow-hidden;
      @apply tw-left-0 tw-right-0;
      @apply tw-bg-pv-grey-96;
    }

    &__buttons {
      @apply tw-flex tw-items-start;
      @apply tw-gap-4;
    }
  }
}

.primary-nav-1,
.primary-nav-2 {
  $pn1: '.primary-nav-1';
  $pn2: '.primary-nav-2';

  @apply tw-bg-pv-white;

  &__element {
    @apply tw-border-b-2;
    @apply tw-border-pv-grey-96;
    @apply tw-overflow-hidden;
  }

  &__link {
    @apply tw-relative;
    @apply tw-block;
    @apply tw-text-base;
    @apply tw-leading-6;
    @apply tw-p-4 tw-pr-10;
    @apply tw-text-pv-grey-16;
    @apply tw-duration-200;
    @apply tw-ease-in-out;
    transition-property: color, background-color, padding-left;

    &::after {
      @apply tw-absolute;
      @apply tw--bottom-0 tw-inset-x-0;
      @apply tw-border-t-2;
      @apply tw-rounded-t-sm;
      @apply tw-border-pv-transparent;
      @apply tw-duration-200;
      @apply tw-ease-in-out;
      transition-property: border, color;
      content: '';
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

  &__buttons {
    @apply tw-flex tw-justify-center;
    @apply tw-p-4;
    @apply tw-relative;
    @apply tw-gap-4;

    button {
      @apply tw-flex tw-justify-center;
      @apply tw-grow;
    }
  }

  @screen md {
    @apply tw-w-1/4;
    @apply tw-pl-8 tw-py-4;

    &__element {
      @apply tw-border-b-0;
    }

    &__link {
      @apply tw-block;
      @apply tw-py-4 tw-px-0;
      @apply tw-rounded-l;

      &:hover {
        @apply tw-pl-4;
        @apply tw-bg-pv-grey-96;
        @apply tw-text-pv-red-lighter;
      }

      &--active {
        @apply tw-pl-4;
        @apply tw-bg-pv-white;
      }
    }

    &__icon {
      @apply tw-hidden;
    }

    &__sub-nav {
      @apply tw-absolute;
      @apply tw-top-0;
      @apply tw-overflow-hidden;
      @apply tw-left-1/4 tw-right-0;
      @apply tw-bg-pv-grey-96;
    }

    &__buttons {
      @apply tw-justify-start;
      @apply tw-px-0 tw-pb-0;
      min-height: 56px;

      button {
        @apply tw-block;
        @apply tw-grow-0;
      }
    }

    &__overview {
      @apply tw-mr-4;
    }

    &--passive {
      @apply tw-bg-pv-grey-96;

      #{$pn1} {
        &__link:hover {
          @apply tw-bg-pv-white;
        }
      }
    }
  }
}
</style>
