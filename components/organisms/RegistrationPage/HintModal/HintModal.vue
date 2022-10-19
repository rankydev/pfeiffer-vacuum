<template>
  <GenericModal
    class="hint-modal"
    :is-open="isOpen"
    @closeModal="$emit('closeModal', { proceedWithoutCompany: false })"
  >
    <div class="hint-modal__content">
      <h2 class="hint-modal__headline">
        {{ $t('registration.registrationHintModal.title') }}
      </h2>
      <p class="tw-subline-3 hint-modal__subline">
        {{ $t('registration.registrationHintModal.subline') }}
      </p>
      <Richtext :richtext="$t('registration.registrationHintModal.richtext')" />
      <div class="hint-modal__button-section">
        <Button
          class="hint-modal__btn-proceed"
          variant="secondary"
          :label="$t('registration.registrationHintModal.buttonLeft')"
          shape="plain"
          icon="arrow_forward"
          @click="$emit('closeModal', { proceedWithoutCompany: true })"
        />
        <Link anchor="registrationCompanyDataForm" class="hint-modal__btn-add">
          <Button
            variant="secondary"
            :label="$t('registration.registrationHintModal.buttonRight')"
            shape="filled"
            icon="domain"
            @click="$emit('closeModal', { proceedWithoutCompany: false })"
          />
        </Link>
      </div>
    </div>
  </GenericModal>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import GenericModal from '~/components/molecules/GenericModal/GenericModal'
import Button from '~/components/atoms/Button/Button'
import Richtext from '~/components/atoms/Richtext/Richtext'
import Link from '~/components/atoms/Link/Link'

export default defineComponent({
  name: 'HintModal',
  components: { GenericModal, Button, Richtext, Link },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ['closeModal'],
})
</script>

<style lang="scss">
@import '/assets/scss/mixins';

.hint-modal {
  @apply tw-w-full;

  &__headline {
    @apply tw-mb-0;
  }

  &__subline {
    @apply tw-mb-4;
  }

  .paragraph-section {
    ul {
      @apply tw-my-4;

      li {
        @apply tw-mb-4;
      }
    }
  }

  &__button-section {
    @screen lg {
      @apply tw-flex;
      @apply tw-justify-between;
      @apply tw-mt-4;
    }
  }

  &__btn-proceed {
    @apply tw-mb-6;

    @screen lg {
      @apply tw-mb-0;
    }
  }

  &__btn-add {
    @apply tw-block;
    @include fill-available;

    @screen md {
      @apply tw-w-max;
    }

    .button {
      @include fill-available;

      @screen md {
        @apply tw-w-max;
      }
    }
  }
}
</style>
