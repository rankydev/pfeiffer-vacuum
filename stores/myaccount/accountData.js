import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, useContext } from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/composables/useToast'
import { minLength, required, helpers } from '@vuelidate/validators'

export const useAccountDataStore = defineStore('accountData', () => {
  const { i18n } = useContext()
  const toast = useToast()
  const userStore = useUserStore()
  const { currentUser, userCountry, userBillingAddress, changePasswordLink } =
    storeToRefs(userStore)
  const { addCompanyData } = userStore

  // States
  const isEditMode = ref(false)
  const addedCompanyData = ref({})
  const showCompanySuccess = ref(false)

  // Getters
  const formattedAddress = computed(
    () =>
      `${userBillingAddress.value.line1} ${userBillingAddress.value.line2}, ${userBillingAddress.value.postalCode} ${userBillingAddress.value.town}, ${userCountry.value.name}`
  )

  const accountDataPattern = computed(() => [
    {
      id: 'company',
      label: i18n.t('registration.formAccountData.companyUniversity'),
      value: currentUser.value?.orgUnit?.name || '-',
      editable: true,
      disabled: true,
    },
    {
      id: 'country',
      label: i18n.t('registration.formCompanyData.country'),
      value: userCountry.value.name,
      editable: true,
      disabled: true,
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
      value: currentUser.value?.orgUnit?.furtherDetails,
    },
    {
      id: 'customer-number',
      label: i18n.t('registration.formCompanyData.customerNumber'),
      value: currentUser.value?.orgUnit?.customerId || '-',
    },
    {
      id: 'department',
      label: i18n.t('registration.formCompanyData.department'),
      value: currentUser.value?.department,
    },
    {
      id: 'vat',
      label: i18n.t('registration.formCompanyData.tax'),
      value: currentUser.value?.orgUnit?.vatID,
    },
    {
      id: 'phone',
      label: i18n.t('registration.formCompanyData.phone'),
      value: currentUser.value?.phone,
    },
    {
      id: 'fax',
      label: i18n.t('registration.formCompanyData.fax'),
      value: currentUser.value?.fax,
    },
    {
      id: 'address',
      label: i18n.t('registration.formCompanyData.address'),
      value: formattedAddress.value,
    },
  ])

  const infoMessagePatterns = ref({
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
  })

  const saveAccountDataButtons = ref([
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
      })
      showCompanySuccess.value = true
    } catch {
      toast.error({
        description: i18n.t('registration.addCompanyData.errorOccured'),
      })
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
