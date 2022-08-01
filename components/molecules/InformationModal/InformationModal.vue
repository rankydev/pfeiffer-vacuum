<template>
  <transition name="fade">
    <GenericModal>
      <div class="modal__box">
        <Icon
          class="modal__icon"
          icon="close"
          size="small"
          @click="$emit('closeModal')"
        />
        <h3>Your personal price</h3>
        <div>
          <Richtext :richtext="text" />
          >
        </div>
        <div>
          <Button
            variant="secondary"
            label="Need any help?"
            shape="outlined"
            @click="$emit('closeModal')"
          ></Button>
        </div>
      </div>
    </GenericModal>
  </transition>
</template>

<script>
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import Icon from '~/components/atoms/Icon/Icon.vue'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import GenericModal from '../GenericModal/GenericModal.vue'

export default defineComponent({
  components: {
    Button,
    Icon,
    Richtext,
    GenericModal,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    headline: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
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
      if (ev.target.className === 'modal__content') {
        emit('closeModal')
      }
    }

    onMounted(() => {
      window.addEventListener('keyup', toggleModal)
      window.addEventListener('click', handleBgClick)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('keyup', toggleModal)
      window.removeEventListener('click', handleBgClick)
    })
  },
})
</script>

<style lang="scss">
.modal {
  &__box {
    @apply tw-rounded-md;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-relative;
    @apply tw-p-4;
    @apply tw-bg-pv-white;
    width: 1200px;
  }

  &__icon {
    @apply tw-absolute;
    @apply tw-top-4;
    @apply tw-right-4;
    @apply tw-cursor-pointer;

    &:hover,
    &:focus-visible {
      @apply tw-text-pv-red-lighter;
    }
  }
}
</style>
