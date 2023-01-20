<template>
  <div class="account-data">
    <MyAccountHeading />
    <SectionHeadline :buttons="accountDataButtons" @btnClick="toggleEdit">
      Account Data
    </SectionHeadline>
    <div
      :class="[
        'account-data__account-specific',
        { 'account-data__account-specific--edit-mode': isEditMode },
      ]"
    >
      <MyAccountEditableTextfield
        v-for="entry in accountDataFields"
        :key="entry.id"
        :class="'account-data__' + entry.id"
        :value="entry.value"
        :label="entry.label"
        :disabled="entry.disabled"
        :editable="entry.editable && isEditMode"
        :button="entry.button || null"
        @changed="dataChanged(entry.id, $event)"
      />
    </div>
    <SectionHeadline>Company Data</SectionHeadline>
    <div class="account-data__company-specific">
      <MyAccountEditableTextfield
        v-for="entry in companyData"
        :key="entry.id"
        :class="'account-data__' + entry.id"
        :value="entry.value"
        :label="entry.label"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import MyAccountHeading from '~/components/organisms/MyAccount/partials/MyAccountHeading'
import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline'
import MyAccountEditableTextfield from '~/components/organisms/MyAccount/partials/MyAccountEditableTextfield'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'AccountData',
  components: {
    MyAccountHeading,
    SectionHeadline,
    MyAccountEditableTextfield,
  },
  setup() {
    const userStore = useUserStore()
    const { currentUser, userBillingAddress } = storeToRefs(userStore)
    const { updateCurrentUser } = userStore

    const userCountry = computed(() => userBillingAddress.value.country?.name)

    const formattedAddress = computed(
      () =>
        `${userBillingAddress.value.line1} ${userBillingAddress.value.line2}, ${userBillingAddress.value.postalCode} ${userBillingAddress.value.town}, ${userCountry.value}`
    )

    const accountData = computed(() => [
      {
        id: 'company',
        label: 'Company / University',
        value: currentUser?.value.orgUnit?.name || '-',
        editable: true,
        disabled: true,
      },
      {
        id: 'country',
        label: 'Country / Location',
        value: userCountry.value,
        editable: true,
        disabled: true,
      },
      {
        id: 'name',
        label: 'Name',
        value: currentUser?.value.name,
        editable: true,
        onlyDisplay: true,
      },
      {
        id: 'firstName',
        label: 'Firstname',
        value: currentUser?.value.firstName,
        editable: true,
        onlyEdit: true,
      },
      {
        id: 'lastName',
        label: 'Lastname',
        value: currentUser?.value.lastName,
        editable: true,
        onlyEdit: true,
      },
      {
        id: 'email',
        label: 'Email',
        value: currentUser?.value.displayUid,
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
        },
      },
    ])

    const companyData = computed(() => [
      {
        id: 'company-further-details',
        label: 'Futher company details',
        value: currentUser?.value.orgUnit?.furtherDetails,
      },
      {
        id: 'customer-number',
        label: 'Customer Number',
        value: currentUser?.value.customerId,
      },
      {
        id: 'department',
        label: 'Department / Institute',
        value: currentUser?.value.department,
      },
      {
        id: 'vat',
        label: 'VAT Number',
        value: currentUser?.value.orgUnit?.vatID,
      },
      {
        id: 'phone',
        label: 'Phone',
        value: currentUser?.value.phone,
      },
      {
        id: 'fax',
        label: 'Fax',
        value: currentUser?.value.fax,
      },
      {
        id: 'address',
        label: 'Address',
        value: formattedAddress.value,
      },
    ])

    const isEditMode = ref(false)

    const accountDataFields = computed(() =>
      isEditMode.value
        ? accountData.value.filter((e) => !e.onlyDisplay)
        : accountData.value.filter((e) => !e.onlyEdit)
    )

    const accountDataButtons = computed(() =>
      isEditMode.value
        ? [
            {
              label: 'Discard',
              icon: 'close',
              variant: 'secondary',
              shape: 'outlined',
            },
            {
              label: 'Save changes',
              icon: 'save',
              variant: 'secondary',
            },
          ]
        : [{ icon: 'edit', variant: 'secondary', shape: 'plain' }]
    )

    const updatedData = ref({})

    const toggleEdit = async (i) => {
      if (isEditMode.value && i > 0) {
        await updateCurrentUser({ ...currentUser.value, ...updatedData.value })
      }
      isEditMode.value = !isEditMode.value
    }

    const dataChanged = (field, value) => {
      updatedData.value[field] = value
      console.log(updatedData.value)
    }

    return {
      isEditMode,
      companyData,
      accountDataButtons,
      accountDataFields,
      userBillingAddress,
      toggleEdit,
      dataChanged,
    }
  },
})
</script>
<style lang="scss" scoped>
.account-data {
  $root: &;

  &__account-specific,
  &__company-specific {
    @apply tw-grid tw-grid-cols-12;
    @apply tw-gap-1;
    @apply tw-mt-2 tw-mb-12;
  }

  &__company-specific {
    @apply tw-mb-0;
  }

  &__password,
  &__company-further-details,
  &__customer-number,
  &__address {
    @apply tw-col-span-12;
  }

  &__company,
  &__country,
  &__name,
  &__email,
  &__department,
  &__vat,
  &__phone,
  &__fax,
  &__firstName,
  &__lastName {
    @apply tw-col-span-6;
  }

  &__account-specific--edit-mode {
    #{$root}__email {
      @apply tw-col-span-12;
    }
  }
}
</style>
