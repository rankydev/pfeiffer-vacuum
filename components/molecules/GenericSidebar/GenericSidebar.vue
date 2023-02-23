<template>
  <div class="sidebar">
    <transition name="fast-fade">
      <div
        v-if="isOpen"
        class="sidebar__backdrop"
        @click="$emit('closeSidebar')"
      />
    </transition>
    <transition :name="`sidebar-slide-${position}`">
      <div
        v-if="isOpen"
        class="sidebar__panel"
        :class="`sidebar__panel--${position}`"
      >
        <Icon
          icon="close"
          class="sidebar__panel-close"
          @click="$emit('closeSidebar')"
        />
        <div class="sidebar__panel-content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, watch } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'
export default defineComponent({
  name: 'GenericSidebar',
  components: { Icon },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'right',
      validator: (val) => ['right', 'left'].includes(val),
    },
  },
  emits: ['closeSidebar'],
  setup(props, { emit }) {
    const toggleSidebar = (ev) => {
      if (ev.keyCode === 27) {
        emit('closeSidebar')
      }
    }

    watch(
      () => props.isOpen,
      (val) => {
        if (val) {
          window.addEventListener('keyup', toggleSidebar)
        } else {
          window.removeEventListener('keyup', toggleSidebar)
        }
      }
    )
  },
})
</script>

<style lang="scss">
@import '/assets/scss/z-index';

.sidebar {
  &__backdrop {
    z-index: $generic-modal;
    @apply tw-bg-pv-grey-32-opacity;
    @apply tw-top-0;
    @apply tw-left-0;
    @apply tw-h-screen;
    @apply tw-w-screen;
    @apply tw-fixed;
  }

  &__panel {
    @apply tw-fixed;
    @apply tw-top-0;
    @apply tw-bg-pv-white;
    @apply tw-h-screen;
    @apply tw-w-[calc(100%-1rem)];
    @apply tw-border tw-border-pv-grey-96;
    z-index: $generic-modal;

    @screen md {
      @apply tw-w-1/2;
    }
    @screen lg {
      @apply tw-w-1/3;
    }

    &--right {
      @apply tw-right-0;
      @apply tw-rounded-tl-lg;
      @apply tw-rounded-bl-lg;
    }

    &--left {
      @apply tw-left-0;
      @apply tw-rounded-tr-lg;
      @apply tw-rounded-br-lg;
    }
  }

  &__panel-close {
    @apply tw-absolute;
    @apply tw-right-4;
    @apply tw-top-4;
    @apply tw-text-pv-grey-16;
    @apply tw-cursor-pointer;
  }

  &__panel-content {
    @apply tw-h-screen;
  }
}
</style>
