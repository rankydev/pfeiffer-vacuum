<template>
  <div class="sidebar">
    <transition name="fast-fade">
      <div v-if="state" class="sidebar-backdrop" @click="$emit('close')" />
    </transition>
    <transition :name="`sidebar-slide-${position}`">
      <div
        v-if="state"
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
          @click="$emit('close')"
        />
        <div class="sidebar-panel--content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  name: 'GenericSidebar',
  components: { Button },
  props: {
    state: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'right',
      validator: (val) => ['right', 'left'].includes(val),
    },
  },
  emits: ['close'],
  setup() {
    return {}
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
