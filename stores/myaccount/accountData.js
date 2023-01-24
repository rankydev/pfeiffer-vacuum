import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useToast } from '~/composables/useToast'

export const useAccountDataStore = defineStore('accountData', () => {
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
      label: 'Company / University',
      value: currentUser.value?.orgUnit?.name || '-',
      editable: true,
      disabled: true,
    },
    {
      id: 'country',
      label: 'Country / Location',
      value: userCountry.value.name,
      editable: true,
      disabled: true,
    },
    {
      id: 'name',
      label: 'Name',
      value: currentUser.value?.name,
      editable: true,
      onlyDisplay: true,
    },
    {
      id: 'firstName',
      label: 'Firstname',
      value: currentUser.value?.firstName,
      editable: true,
      onlyEdit: true,
    },
    {
      id: 'lastName',
      label: 'Lastname',
      value: currentUser.value?.lastName,
      editable: true,
      onlyEdit: true,
    },
    {
      id: 'email',
      label: 'Email',
      value: currentUser.value?.displayUid,
      editable: true,
      disabled: true,
    },
    {
      id: 'password',
      label: 'Password',
      value: '**********',
      button: {
        label: 'Change password',
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
      label: 'Futher company details',
      value: currentUser.value?.orgUnit?.furtherDetails,
    },
    {
      id: 'customer-number',
      label: 'Customer Number',
      value: currentUser.value?.orgUnit?.customerId || '-',
    },
    {
      id: 'department',
      label: 'Department / Institute',
      value: currentUser.value?.department,
    },
    {
      id: 'vat',
      label: 'VAT Number',
      value: currentUser.value?.orgUnit?.vatID,
    },
    {
      id: 'phone',
      label: 'Phone',
      value: currentUser.value?.phone,
    },
    {
      id: 'fax',
      label: 'Fax',
      value: currentUser.value?.fax,
    },
    {
      id: 'address',
      label: 'Address',
      value: formattedAddress.value,
    },
  ])

  const infoMessagePatterns = ref({
    companyDataSuccess: {
      variant: 'success',
      headline: 'Thank you for completing your account!',
      description:
        'Your registration details will be checked by our Pfeiffer Vacuum Team within normal working hours. You will receive an acceptance or denial email afterwards. This may take up to two business days.',
    },
    open: {
      variant: 'warning',
      headline: 'Still a little patience...',
      description:
        'Your registration details are currently being checked by our Pfeiffer Vacuum Team within normal working hours. You will receive an acceptance or denial email afterwards. This may take up to two business days.',
    },
    rejected: {
      variant: 'error',
      headline: 'Sorry, your account has been rejected.',
      description:
        'If you have any questions, please contact our customer service.',
    },
  })

  const saveAccountDataButtons = ref([
    {
      label: 'Discard',
      icon: 'close',
      variant: 'secondary',
      shape: 'outlined',
      desktopOnly: true,
    },
    {
      label: 'Save changes',
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
        description: 'An error occured while adding company data.',
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
