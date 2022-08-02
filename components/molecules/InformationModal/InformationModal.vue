<template>
  <GenericModal :is-open="isOpen" @closeModal="$emit('closeModal')">
    <h3>Your personal price</h3>
    <div>
      <Richtext :richtext="text" />
    </div>
    <div>
      <Button
        variant="secondary"
        label="Need any help?"
        shape="outlined"
        @click="$emit('closeModal')"
      ></Button>
    </div>
  </GenericModal>
</template>

<script>
import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
} from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import GenericModal from '../GenericModal/GenericModal.vue'

export default defineComponent({
  components: {
    Button,
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
  setup(props, { emit }) {},
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
    padding: 24px;

    // width: 250px;

    @screen md {
      // width: 500px;
    }

    @screen lg {
      width: 1200px;
    }
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
