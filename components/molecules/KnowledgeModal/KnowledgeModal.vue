<template>
  <ContentWrapper>
    <GenericModal :is-open="isOpen" @closeModal="closeModal">
      <div class="knowledge-modal">
        <h2>{{ $t('registration.registrationModal.pleaseLogIn') }}</h2>
        <span class="tw-subline-3">
          {{ $t('registration.registrationModal.registerForMoreFeatures') }}
        </span>
        <div class="knowledge-modal__content">
          <div v-if="!isMobile" class="knowledge-modal__registration-form">
            <CreateAccount
              headline="registration.registrationModal.basisRegistration"
              :description="
                $t(
                  'registration.registrationModal.basisRegistrationDescription'
                )
              "
              :selected-country="selectedCountry"
              :selected-region="selectedRegion"
              @update="
                requestData.personalData = $event.registration
                createAccountErrors = $event.errors
              "
            />
            <div class="knowledge-modal__actions">
              <Button
                :label="$t('registration.registrationModal.cancel')"
                variant="secondary"
                shape="outlined"
                icon="close"
                @click="closeModal"
              />
              <Button
                :label="$t('registration.registrationModal.submit')"
                variant="secondary"
                icon="send"
                @click="submit"
              />
            </div>
          </div>
          <div class="knowledge-modal__cta-area">
            <ContentCTABox
              v-for="(box, index) in ctaBoxContents"
              :key="index"
              v-bind="box"
              @click="box.click() || null"
            />
          </div>
        </div>
      </div>
    </GenericModal>
  </ContentWrapper>
</template>
<script>
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import GenericModal from '~/components/molecules/GenericModal/GenericModal'
import CreateAccount from '~/components/molecules/CreateAccount/CreateAccount'
import ContentCTABox from '~/components/molecules/ContentCTABox/ContentCTABox'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import { getKnowledgeData } from './KnowledgeModal.data'
import { useUserStore } from '~/stores/user'
import { useVuelidate } from '@vuelidate/core'
import { useToast } from '~/composables/useToast'

export default {
  name: 'KnowledgeModal',
  components: {
    Button,
    GenericModal,
    CreateAccount,
    ContentCTABox,
    ContentWrapper,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    const { app, i18n } = useContext()
    const userStore = useUserStore()
    const v = useVuelidate()
    const { ctaBoxContents } = getKnowledgeData()
    const requestData = ref({ personalData: {}, companyData: {}, errors: {} })
    const toast = useToast()
    const createAccountErrors = ref({ password: false })

    const clearRequestData = () => {
      requestData.value = { personalData: {}, companyData: {} }
    }

    const closeModal = () => {
      emit('closeModal')
      clearRequestData()
    }

    const selectedCountry = computed(() => {
      const country = requestData.value.personalData.address?.country

      if (country && Object.keys(country).length) return country

      return undefined
    })

    const selectedRegion = computed(() => {
      const region = requestData.value.personalData.address?.region

      if (region && Object.keys(region).length) return region

      return undefined
    })

    const submit = async () => {
      const hasValidationError = !(await v.value.$validate())
      const passwordError = createAccountErrors.value?.password
      if (!hasValidationError && !passwordError) {
        await userStore.register(requestData)
        closeModal()
      } else {
        toast.warning(
          {
            description: i18n.t('form.validationErrorMessages.warning'),
          },
          {
            timeout: 8000,
          }
        )
      }
    }

    return {
      ctaBoxContents,
      requestData,
      selectedCountry,
      selectedRegion,
      isMobile: app.$breakpoints.isMobile,
      createAccountErrors,

      submit,
      closeModal,
    }
  },
}
</script>
<style lang="scss">
.knowledge-modal {
  &__content {
    @apply tw-grid tw-grid-cols-12;
    @apply tw-gap-8;
    @apply tw-mt-12;
  }

  &__actions {
    @apply tw-flex tw-justify-between;
    @apply tw-gap-2;
    @apply tw-mt-8;
  }

  &__registration-form,
  &__cta-area {
    @apply tw-col-span-12;

    @screen md {
      @apply tw-col-span-6;
    }
  }

  &__cta-area {
    @apply tw-flex tw-flex-col;
    @apply tw-gap-8;
  }
}
</style>
