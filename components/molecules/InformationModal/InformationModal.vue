<template>
  <GenericModal
    class="information-modal"
    :is-open="isOpen"
    @closeModal="$emit('closeModal')"
  >
    <div class="information-modal__content">
      <h2 class="information-modal__headline">{{ headline }}</h2>
      <div>
        <Richtext class="information-modal__text" :richtext="text" />
      </div>
      <div>
        <NuxtLink :to="localePath('/contact/')">
          <Button
            class="information-modal__btn"
            variant="secondary"
            :label="$t('product.help')"
            shape="outlined"
          ></Button
        ></NuxtLink>
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
})
</script>

<style lang="scss">
.information-modal {
  &__content {
    @apply tw-flex;
    @apply tw-flex-col;
  }

  &__headline {
    @apply tw-mb-4;
  }

  &__btn {
    @apply tw-mt-4;
  }
}
</style>
