<template>
  <transition name="fade">
    <div v-if="isOpen" class="modal">
      <div class="modal__background">
        <div class="modal__box">
          <Icon
            class="modal__icon"
            icon="close"
            size="small"
            @click="$emit('closeModal')"
          />
          <slot @closeModal="$emit('closeModal')" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, watch } from '@nuxtjs/composition-api'
import Icon from '~/components/atoms/Icon/Icon.vue'

export default defineComponent({
  components: { Icon },
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

    const handleBgClick = (ev) => {
      if (ev.target.className === 'modal__background') {
        emit('closeModal')
      }
    }

    watch(
      () => props.isOpen,
      (val) => {
        if (val) {
          document.querySelector('body').style.overflow = 'hidden'
          window.addEventListener('keyup', toggleModal)
          window.addEventListener('click', handleBgClick)
        } else {
          document.querySelector('body').style.overflow = 'visible'
          window.removeEventListener('keyup', toggleModal)
          window.removeEventListener('click', handleBgClick)
        }
      }
    )
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
  @apply tw-bg-pv-grey-32-opacity;

  &__background {
    @apply tw-h-full;
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-justify-center;
  }
}
</style>
