<template>
  <GenericModal
    class="information-modal"
    :is-open="isOpen"
    @closeModal="$emit('closeModal')"
  >
    <h2 class="information-modal__headline">{{ headline }}</h2>
    <div>
      <Richtext class="information-modal__text" :richtext="text" />
    </div>
    <div>
      <Button
        class="information-modal__btn"
        variant="secondary"
        label="Need any help?"
        shape="outlined"
      ></Button>
    </div>
  </GenericModal>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
  setup() {},
})
</script>

<style lang="scss">
.modal {
  &__box {
    @apply tw-rounded-lg;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-relative;
    @apply tw-p-4;
    @apply tw-bg-pv-white;
    @apply tw-p-8;

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
    @apply tw-top-8;
    @apply tw-right-8;
    @apply tw-ml-4;
    @apply tw-cursor-pointer;

    &:hover,
    &:focus-visible {
      @apply tw-text-pv-red-lighter;
    }
  }
}

.information-modal {
  &__headline {
    @apply tw-mb-4;
  }

  &__btn {
    @apply tw-mt-4;
  }
}
</style>
