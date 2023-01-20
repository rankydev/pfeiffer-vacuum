<template>
  <div class="sidebar">
    <transition name="fast-fade">
      <div
        v-if="isOpen"
        class="sidebar-backdrop"
        @click="$emit('closeSidebar')"
      />
    </transition>
    <transition :name="`sidebar-slide-${position}`">
      <div
        v-if="isOpen"
        class="sidebar-panel tw-w-11/12 md:tw-w-3/5 lg:tw-w-2/5"
        :class="{
          'tw-left-0': position === 'left',
          'tw-right-0': position !== 'left',
        }"
      >
        <Button
          icon="close"
          variant="secondary"
          shape="plain"
          class="sidebar-panel--btn"
          @click="$emit('closeSidebar')"
        />
        <div class="sidebar-panel--content">
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
      console.log(ev, 'called toggleSidebar')
      if (ev.keyCode === 27) {
        console.log(ev.keyCode)
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

.sidebar-backdrop {
  z-index: $generic-modal;
  @apply tw-bg-pv-grey-32-opacity;
  @apply tw-top-0;
  @apply tw-left-0;
  @apply tw-h-screen;
  @apply tw-w-screen;
  @apply tw-fixed;
}

.sidebar-panel {
  @apply tw-overflow-y-auto;
  @apply tw-fixed;
  @apply tw-bg-pv-white;
  @apply tw-top-0;
  @apply tw-h-screen;
  z-index: $generic-modal;

  &--btn {
    @apply tw-absolute;
    @apply tw-right-0;
  }

  &--content {
    @apply tw-p-4;
  }
}
</style>
