<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal">
      <!-- <div class="modal"> -->
      <div class="modal__content">
        <div class="modal__box">
          <!-- Hier soll ein Slot rein, in dem eine ganze Box reingesetzt wird -->
          <!-- Zweite Komponente: Gemeric Modal und Information Modal -> GenericModal wrapped dann InformartionModal -->
          <Icon
            class="modal__icon"
            icon="close"
            size="small"
            @click="$emit('closeModal')"
          />
          <h3>Your personal price</h3>
          <div>
            <span
              >This price is your price ...Lorem ipsum dolor sit amet,
              consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet.</span
            >
          </div>
          <Button label="Close" @click="$emit('closeModal')"></Button>
        </div>
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
  ref,
} from '@nuxtjs/composition-api'
import { emit } from 'process'
import Button from '~/components/atoms/Button/Button.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: {
    Button,
    Icon,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    const handleKeyUp = (ev) => {
      if (ev.keyCode === 27) {
        emit('closeModal')
      }
    }

    onMounted(() => {
      document.querySelector('body').style.overflow = 'hidden'
      window.addEventListener('keyup', handleKeyUp)
    })

    onBeforeUnmount(() => {
      document.querySelector('body').style.overflow = 'visible'
      window.removeEventListener('keyup', handleKeyUp)
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
