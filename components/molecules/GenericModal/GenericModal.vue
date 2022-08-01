<template>
  <!-- Transition setzen für fade in/out -->
  <transition name="fade">
    <div class="modal">
      <div class="modal__content">
        <slot @closeModal="$emit('closeModal')" />
        <!-- hier an Parent emitten, damit im Parent Component entfernt wird und Unmounted stattfindet -->
      </div>
    </div>
  </transition>
</template>

<script>
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  props: {},
  emits: ['closeModal'],
  setup(props, { emit }) {
    onMounted(() => {
      document.querySelector('body').style.overflow = 'hidden'
    })
    onBeforeUnmount(() => {
      document.querySelector('body').style.overflow = 'visible'
    })
  },
})
</script>

<style lang="scss">
.modal {
  z-index: 100;
  @apply tw-top-0;
  @apply tw-right-0;
  @apply tw-h-screen;
  @apply tw-w-screen;
  @apply tw-fixed;
  @apply tw-bg-pv-grey-48-opacity;

  &__content {
    @apply tw-h-full;
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-justify-center;
  }
}
</style>
