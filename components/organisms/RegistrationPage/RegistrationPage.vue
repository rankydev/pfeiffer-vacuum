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
            :validate="validate"
            @update="requestData.personalData = $event.registration"
          />
          <RegistrationCompanyDataForm
            id="registrationCompanyDataForm"
            :validate="validate"
            :selected-country="
              hasCountrySelectionData
                ? requestData.personalData.address.country
                : undefined
            "
            :selected-region="
              hasCountrySelectionData
                ? requestData.personalData.address.region
                : undefined
            "
            :proceed-without-company="proceedWithoutCompany"
            @update="requestData.companyData = $event.companyData"
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
        <ContentCTABox v-bind="contentCTABoxLoginData" />
      </div>
    </div>

    <HintModal :is-open="modalIsOpen" @closeModal="toggleModal" />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
  computed,
} from '@nuxtjs/composition-api'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import Richtext from '~/components/atoms/Richtext/Richtext'
import ContentCTABox from '~/components/molecules/ContentCTABox/ContentCTABox'
import CreateAccount from '~/components/molecules/CreateAccount/CreateAccount'
import RegistrationCompanyDataForm from '~/components/molecules/RegistrationCompanyDataForm/RegistrationCompanyDataForm'
import RegistrationPageDataProtection from '~/components/organisms/RegistrationPage/RegistrationPageDataProtection/RegistrationPageDataProtection'
import Button from '~/components/atoms/Button/Button'
import HintModal from '~/components/organisms/RegistrationPage/HintModal/HintModal'
import getKey from '~/composables/useUniqueKey'
import { useToast } from '~/composables/useToast'
import useVuelidate from '@vuelidate/core'
import { useUserApi } from '~/stores/user/partials/useUserApi'

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
    const { i18n } = useContext()
    const userApi = useUserApi()
    const router = useRouter()
    const toast = useToast()
    const v = useVuelidate()
    const loading = ref(false)
    let proceedWithoutCompany = ref(false)
    let validate = ref(false)
    const requestData = ref({ personalData: {}, companyData: {} })
    const modalIsOpen = ref(false)

    const hasCountrySelectionData = computed(() => {
      if (!requestData.value.personalData?.address) return false

      if (
        requestData.value.personalData.address.country &&
        Object.keys(requestData.value.personalData.address.country).length
      )
        return true
    })

    /**
     * data of content cta boxes
     */
    const contentCTABoxHelpData = {
      headline: i18n.t('registration.registrationPage.contentCTABoxHelpTitle'),
      description: [
        {
          _uid: getKey('registration__content-cta-box-help'),
          component: 'Richtext',
          richtext: i18n.t(
            'registration.registrationPage.contentCTABoxHelpDescription'
          ),
        },
      ],
      button: [
        {
          _uid: '3dd3700b-9e95-46d5-87ab-fd917b80848f',
          icon: 'mail_outline',
          label: i18n.t('registration.registrationPage.contentCTABoxHelpLink'),
          shape: 'outlined',
          variant: 'secondary',
          component: 'Button',
        },
      ],
    }
    const contentCTABoxLoginData = {
      headline: i18n.t('registration.registrationPage.contentCTABoxLoginTitle'),
      description: [
        {
          _uid: getKey('registration__content-cta-box-login'),
          component: 'Richtext',
          richtext: i18n.t(
            'registration.registrationPage.contentCTABoxLoginDescription'
          ),
        },
      ],
      button: [
        {
          _uid: '3dd3700b-9e95-46d5-87ab-fd917b80848f',
          icon: 'person',
          label: i18n.t('registration.registrationPage.contentCTABoxLoginLink'),
          shape: 'outlined',
          variant: 'secondary',
          component: 'Button',
        },
      ],
    }

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

        if (proceedWithoutCompany.value) return triggerSendRegistrationProcess()
      }
    }

    /**
     * Function either triggered by closeModal > triggerModal, or submit-button
     */
    const triggerSendRegistrationProcess = () => {
      const hasCompanyData =
        requestData.value.companyData &&
        Object.values(requestData.value.companyData).length

      if (!hasCompanyData && !proceedWithoutCompany.value) return toggleModal()

      validate.value = true
      if (v.value.$errors.length + v.value.$silentErrors.length === 0)
        return submit()
    }

    const submit = async () => {
      loading.value = true
      const customerData = {
        ...requestData.value.personalData,
        ...requestData.value.companyData,
        companyAddressCountryIso:
          requestData.value.personalData.address.country.isocode,
        companyAddressRegion:
          requestData.value.personalData.address.region.name,
        companyAlreadyCustomer:
          requestData.value.companyData.companyAlreadyCustomer || false,
      }

      await userApi
        .register(customerData)
        .then(() => {
          loading.value = false
          router.push('/registration/success')
          toast.success(
            {
              description: i18n.t('form.message.success'),
            },
            {
              timeout: 8000,
            }
          )
        })
        .catch(() => {
          loading.value = false
          toast.error({
            description: i18n.t('form.message.error'),
          })
        })
    }

    return {
      contentCTABoxHelpData,
      contentCTABoxLoginData,
      hasCountrySelectionData,
      loading,
      modalIsOpen,
      proceedWithoutCompany,
      requestData,
      validate,
      toggleModal,
      triggerSendRegistrationProcess,
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
