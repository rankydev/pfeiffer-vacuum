<template>
  <GenericModal
    class="information-modal"
    :is-open="isOpen"
    @closeModal="$emit('closeModal')"
  >
    <div class="information-modal__content">
      <h2 class="information-modal__headline">{{ headline }}</h2>
      <div v-if="text">
        <Richtext class="information-modal__text" :richtext="text" />
      </div>
      <div>
        <Button
          :class="
            confirmText
              ? 'information-modal__confirm-btn'
              : 'information-modal__btn'
          "
          variant="secondary"
          :label="confirmText ? confirmText : $t('product.help')"
          :shape="confirmText ? 'filled' : 'outlined'"
          :icon="confirmIcon"
          :href="confirmText ? null : localePath('/contact/')"
          @click="$emit('confirm')"
        />
        <Button
          v-if="cancelText"
          :class="
            cancelText
              ? 'information-modal__confirm-btn'
              : 'information-modal__btn'
          "
          variant="secondary"
          :label="cancelText"
          :icon="cancelIcon"
          shape="outlined"
          @click="$emit('cancel')"
        />
      </div>
    </div>
  </GenericModal>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button.vue'
import Richtext from '~/components/atoms/Richtext/Richtext.vue'
import GenericModal from '~/components/molecules/GenericModal/GenericModal.vue'

export default defineComponent({
  name: 'InformationModal',
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
    confirmText: {
      type: String,
      default: null,
    },
    confirmIcon: {
      type: String,
      default: null,
    },
    cancelText: {
      type: String,
      default: null,
    },
    cancelIcon: {
      type: String,
      default: null,
    },
  },
  emits: ['closeModal', 'confirm', 'cancel'],
})
</script>

<style lang="scss">
.information-modal {
  .modal__box {
    @apply tw-max-w-3xl;
    @apply tw-w-full;
  }

  &__content {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-w-full;
  }

  &__headline {
    @apply tw-mb-4;
    @apply tw-w-4/5;

    @screen md {
      @apply tw-w-full;
    }
  }

  &__btn {
    @apply tw-mt-4;
  }

  &__confirm-btn {
    @apply tw-mb-4;
    @apply tw-w-[calc(100%-2rem)];
  }
}
</style>
