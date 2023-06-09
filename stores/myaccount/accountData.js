import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/composables/useToast'
import { minLength, required, helpers } from '@vuelidate/validators'

export const useAccountDataStore = defineStore('accountData', () => {
  const { i18n } = useContext()
  const toast = useToast()
  const userStore = useUserStore()
  const {
    currentUser,
    userCountry,
    userRegion,
    userBillingAddress,
    changePasswordLink,
  } = storeToRefs(userStore)
  const { addCompanyData } = userStore

  // States
  const isEditMode = ref(false)
  const addedCompanyData = ref({})
  const showCompanySuccess = ref(false)

  // Getters
  const formattedAddress = computed(
    () =>
      `${userBillingAddress.value.line1} ${userBillingAddress.value.line2}, ${
        userBillingAddress.value.postalCode
      } ${userBillingAddress.value.town}, ${userCountry.value.name}${
        userRegion.value.name ? `, ${userRegion.value.name}` : ''
      }`
  )

  const accountDataPattern = computed(() => [
    {
      id: 'company',
      label: i18n.t('registration.formAccountData.companyUniversity'),
      value: currentUser.value?.orgUnit?.name || '-',
      editable: true,
      disabled: true,
      validation: {
        required: true,
        rules: {
          required: helpers.withMessage(
            i18n.t('form.validationErrorMessages.required'),
            required
          ),
        },
      },
    },
    {
      id: 'country',
      label: i18n.t('registration.formCompanyData.country'),
      value: `${userCountry.value.name}${
        userRegion.value.name ? `, ${userRegion.value.name}` : ''
      }`,
      editable: true,
      disabled: true,
      validation: {
        required: true,
        rules: {
          required: helpers.withMessage(
            i18n.t('form.validationErrorMessages.required'),
            required
          ),
        },
      },
    },
    {
      id: 'name',
      label: i18n.t('registration.formAccountData.name'),
      value: currentUser.value?.name,
      editable: true,
      onlyDisplay: true,
    },
    {
      id: 'firstName',
      label: i18n.t('registration.formAccountData.firstname'),
      value: currentUser.value?.firstName,
      editable: true,
      onlyEdit: true,
      validation: {
        required: true,
        rules: {
          minLength: minLength(2),
          required: helpers.withMessage(
            i18n.t('form.validationErrorMessages.required'),
            required
          ),
        },
      },
    },
    {
      id: 'lastName',
      label: i18n.t('registration.formAccountData.lastname'),
      value: currentUser.value?.lastName,
      editable: true,
      onlyEdit: true,
      validation: {
        required: true,
        rules: {
          minLength: minLength(2),
          required: helpers.withMessage(
            i18n.t('form.validationErrorMessages.required'),
            required
          ),
        },
      },
    },
    {
      id: 'email',
      label: i18n.t('registration.formAccountData.email'),
      value: currentUser.value?.displayUid,
      editable: true,
      disabled: true,
      validation: {
        required: true,
        rules: {
          required: helpers.withMessage(
            i18n.t('form.validationErrorMessages.required'),
            required
          ),
        },
      },
    },
    {
      id: 'password',
      label: i18n.t('registration.formAccountData.password'),
      value: '**********',
      button: {
        label: i18n.t('registration.formAccountData.changePassword'),
        variant: 'secondary',
        shape: 'plain',
        icon: 'lock',
        href: changePasswordLink.value,
      },
    },
  ])

  const companyDataPattern = computed(() => [
    {
      id: 'company-further-details',
      label: i18n.t(
        'registration.formCompanyData.additionalCompanyInformation'
      ),
      value: currentUser.value?.orgUnit?.furtherDetails || '-',
    },
    {
      id: 'customer-number',
      label: i18n.t('registration.formCompanyData.customerNumber'),
      value: currentUser.value?.orgUnit?.customerId || '-',
    },
    {
      id: 'department',
      label: i18n.t('registration.formCompanyData.department'),
      value: currentUser.value?.department || '-',
    },
    {
      id: 'vat',
      label: i18n.t('registration.formCompanyData.tax'),
      value: currentUser.value?.orgUnit?.vatID || '-',
    },
    {
      id: 'phone',
      label: i18n.t('registration.formCompanyData.phone'),
      value: currentUser.value?.phone || '-',
    },
    {
      id: 'fax',
      label: i18n.t('registration.formCompanyData.fax'),
      value: currentUser.value?.fax || '-',
    },
    {
      id: 'address',
      label: i18n.t('registration.formCompanyData.address'),
      value: formattedAddress.value || '-',
    },
  ])

  const infoMessagePatterns = computed(() => ({
    companyDataSuccess: {
      variant: 'success',
      headline: i18n.t('registration.addCompanyData.success.headline'),
      description: i18n.t('registration.addCompanyData.success.description'),
    },
    open: {
      variant: 'warning',
      headline: i18n.t('registration.addCompanyData.open.headline'),
      description: i18n.t('registration.addCompanyData.open.description'),
    },
    rejected: {
      variant: 'error',
      headline: i18n.t('registration.addCompanyData.rejected.headline'),
      description: i18n.t('registration.addCompanyData.rejected.description'),
    },
  }))

  const saveAccountDataButtons = computed(() => [
    {
      label: i18n.t('registration.addCompanyData.discard'),
      icon: 'close',
      variant: 'secondary',
      shape: 'outlined',
      desktopOnly: true,
    },
    {
      label: i18n.t('registration.addCompanyData.saveChanges'),
      icon: 'save',
      variant: 'secondary',
      desktopOnly: true,
    },
  ])

  const accountDataButtons = computed(() =>
    isEditMode.value
      ? saveAccountDataButtons.value
      : [{ icon: 'edit', variant: 'secondary', shape: 'plain' }]
  )

  // Actions
  const saveCompanyData = async () => {
    try {
      await addCompanyData({
        ...addedCompanyData.value,
        companyAddressCountryIso: userCountry.value?.isocode,
        companyAddressRegion: userRegion.value?.isocode,
      })
      toast.success(
        { description: i18n.t('myaccount.successfulSaving') },
        { timeout: 5000 }
      )
      showCompanySuccess.value = true
    } catch {
      toast.error(
        {
          description: i18n.t('registration.addCompanyData.errorOccured'),
        },
        { timeout: 5000 }
      )
    }
  }

  return {
    // States
    isEditMode,
    addedCompanyData,
    showCompanySuccess,

    //Getters
    accountDataPattern,
    companyDataPattern,
    infoMessagePatterns,
    accountDataButtons,
    saveAccountDataButtons,

    // Actions
    saveCompanyData,
  }
})
