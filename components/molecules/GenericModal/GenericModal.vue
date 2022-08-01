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
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
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
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: #7a7a7a8b;

  &__content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
