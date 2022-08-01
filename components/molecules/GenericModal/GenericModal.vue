<template>
  <!-- Transition setzen für fade in/out -->
  <transition name="fade">
    <div v-if="isOpen" class="modal">
      <div class="modal__content">
        <slot />
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
    const toggleModal = (ev) => {
      if (ev.keyCode === 27) {
        emit('closeModal')
      }
    }

    onMounted(() => {
      document.querySelector('body').style.overflow = 'hidden'
      window.addEventListener('keyup', toggleModal)
    })

    onBeforeUnmount(() => {
      document.querySelector('body').style.overflow = 'visible'
      window.removeEventListener('keyup', toggleModal)
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

  &__box {
    width: 1200px;
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: white;
    padding: 16px;
  }

  &__icon {
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
}
</style>
