<template>
  <div class="registration-page">
    <h1 class="registration-page__title">
      {{ $t('registration.registrationPage.title') }}
    </h1>
    <div class="tw-column-view">
      <div class="registration-page__form-section tw-column-view--left-side">
        <LoadingSpinner :show="loading">
          <Richtext
            :richtext="$t('registration.registrationPage.description')"
          />
          <CreateAccount
            :selected-country="selectedCountry"
            :selected-region="selectedRegion"
            @update="requestData.personalData = $event.registration"
          />
          <RegistrationCompanyDataForm
            id="registrationCompanyDataForm"
            :is-open="isCompanyAddressFormVisible"
            :selected-country="selectedCountry"
            :selected-region="selectedRegion"
            :proceed-without-company="proceedWithoutCompany"
            @update:isOpen="
              isCompanyAddressFormVisible = $event
              if (!isCompanyAddressFormVisible) proceedWithoutCompany = false
            "
            @update:data="requestData.companyData = $event.companyData"
          />
          <RegistrationPageDataProtection />
          <Button
            class="registration-page__form-section__submit-button"
            :label="
              $t('registration.registrationPage.submitRegistrationButton')
            "
            variant="secondary"
            icon="mail_outline"
            @click.native="triggerSendRegistrationProcess()"
          />
        </LoadingSpinner>
      </div>
      <div class="tw-column-view--right-side">
        <ContentCTABox v-bind="contentCTABoxHelpData" />
        <ContentCTABox v-bind="contentCTABoxLoginData" @click="login" />
      </div>
    </div>

    <HintModal :is-open="modalIsOpen" @closeModal="toggleModal" />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import Richtext from '~/components/atoms/Richtext/Richtext'
import ContentCTABox from '~/components/molecules/ContentCTABox/ContentCTABox'
import CreateAccount from '~/components/molecules/CreateAccount/CreateAccount'
import RegistrationCompanyDataForm from '~/components/molecules/RegistrationCompanyDataForm/RegistrationCompanyDataForm'
import RegistrationPageDataProtection from '~/components/organisms/RegistrationPage/RegistrationPageDataProtection/RegistrationPageDataProtection'
import Button from '~/components/atoms/Button/Button'
import HintModal from '~/components/organisms/RegistrationPage/HintModal/HintModal'
import useVuelidate from '@vuelidate/core'
import { useUserStore } from '~/stores/user'
import { useCTABoxHelper } from './partials/useCTABoxHelper'
import { useToast } from '~/composables/useToast'

export default defineComponent({
  name: 'RegistrationPage',
  components: {
    LoadingSpinner,
    Richtext,
    ContentCTABox,
    CreateAccount,
    RegistrationCompanyDataForm,
    RegistrationPageDataProtection,
    Button,
    HintModal,
  },
  setup() {
    const userStore = useUserStore()
    const v = useVuelidate()
    const loading = ref(false)
    const proceedWithoutCompany = ref(false)
    const requestData = ref({ personalData: {}, companyData: {} })
    const modalIsOpen = ref(false)
    const isCompanyAddressFormVisible = ref(false)
    const toast = useToast()
    const { i18n } = useContext()

    const hasCountrySelectionData = computed(() => {
      if (!requestData.value.personalData?.address) return false

      if (
        requestData.value.personalData.address.country &&
        Object.keys(requestData.value.personalData.address.country).length
      )
        return true
    })

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

    const { contentCTABoxHelpData, contentCTABoxLoginData } = useCTABoxHelper()

    /**
     * Function triggered by triggerSendRegistrationProcess() or emitted event "closeModal"
     * eventData will only be present, when triggered by closeModal
     * if proceed-button was clicked, triggerSendRegistrationProcess again, bc user doesn't want to add company data
     */
    const toggleModal = (eventData) => {
      modalIsOpen.value = !modalIsOpen.value

      // will only hold eventData, when either of the options of the close btns have been clicked
      if (eventData) {
        proceedWithoutCompany.value = eventData.proceedWithoutCompany

        if (proceedWithoutCompany.value) {
          triggerSendRegistrationProcess()
        } else {
          isCompanyAddressFormVisible.value = true
        }
      }
    }

    /**
     * Function either triggered by closeModal > triggerModal, or submit-button
     */
    const triggerSendRegistrationProcess = async () => {
      const hasCompanyData =
        requestData.value.companyData &&
        Object.values(requestData.value.companyData).length

      v.value.$validate()

      if (v.value.$errors.length + v.value.$silentErrors.length === 0) {
        if (!hasCompanyData && !proceedWithoutCompany.value) {
          toggleModal()
          return
        }

        loading.value = true
        await userStore.register(requestData)
        loading.value = false
      } else {
        toast.warning({
          description: i18n.t('form.validationErrorMessages.warning'),
        })
      }
    }

    return {
      contentCTABoxHelpData,
      contentCTABoxLoginData,
      hasCountrySelectionData,
      loading,
      modalIsOpen,
      isCompanyAddressFormVisible,
      proceedWithoutCompany,
      requestData,
      selectedCountry,
      selectedRegion,
      toggleModal,
      triggerSendRegistrationProcess,
      login: userStore.login,
    }
  },
})
</script>

<style lang="scss">
.registration-page {
  &__title {
    @apply tw-mb-8;
  }

  &__form-section {
    &__submit-button {
      @apply tw-w-max;
    }

    .loading-spinner {
      @apply tw-flex tw-flex-col;
      @apply tw-gap-12;
    }
  }

  .contact-cta-box {
    @apply tw-mb-4;
  }
}
</style>
