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
        <Button
          icon="close"
          variant="secondary"
          shape="plain"
          class="sidebar__panel__btn"
          @click="$emit('closeSidebar')"
        />
        <div class="sidebar__panel__content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, watch } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  name: 'GenericSidebar',
  components: { Button },
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
    @apply tw-overflow-y-auto;
    @apply tw-fixed;
    @apply tw-bg-pv-white;
    @apply tw-top-0;
    @apply tw-h-screen;
    @apply tw-w-11/12;
    z-index: $generic-modal;

    @screen md {
      @apply tw-w-3/5;
    }
    @screen lg {
      @apply tw-w-2/5;
    }

    &--right {
      @apply tw-right-0;
    }

    &--left {
      @apply tw-left-0;
    }

    &__btn {
      @apply tw-absolute;
      @apply tw-right-0;
    }

    &__content {
      @apply tw-p-4;
    }
  }
}
</style>
