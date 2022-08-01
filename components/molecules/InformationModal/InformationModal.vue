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

    &:hover,
    &:focus-visible {
      @apply tw-text-pv-red-lighter;
    }
  }
}
</style>
