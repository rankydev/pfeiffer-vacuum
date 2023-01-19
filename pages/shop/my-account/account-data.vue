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
        :editable="entry.editable && isEditMode"
        :button="entry.button || null"
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

    const userCountry = computed(() => userBillingAddress.value.country?.name)

    const formattedAddress = computed(
      () =>
        `${userBillingAddress.value.line1} ${userBillingAddress.value.line2}, ${userBillingAddress.value.postalCode} ${userBillingAddress.value.town}, ${userCountry.value}`
    )

    const accountData = [
      {
        id: 'company',
        label: 'Company / University',
        value: currentUser?.value.orgUnit?.name || '-',
        editable: true,
      },
      {
        id: 'country',
        label: 'Country / Location',
        value: userCountry.value,
        editable: true,
      },
      {
        id: 'name',
        label: 'Name',
        value: currentUser?.value.name,
        editable: true,
        onlyDisplay: true,
      },
      {
        id: 'firstname',
        label: 'Firstname',
        value: currentUser?.value.firstName,
        editable: true,
        onlyEdit: true,
      },
      {
        id: 'lastname',
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
    ]

    const companyData = [
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
    ]

    const isEditMode = ref(false)

    const accountDataFields = computed(() =>
      isEditMode.value
        ? accountData.filter((e) => !e.onlyDisplay)
        : accountData.filter((e) => !e.onlyEdit)
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

    const toggleEdit = (i) => {
      if (isEditMode.value) {
        // Discard or save changes
        // i = 0 -> discard
        // i = 1 -> save
        alert(i > 0 ? 'SAVE' : 'DISCARD')
      }
      isEditMode.value = !isEditMode.value
    }

    return {
      isEditMode,
      companyData,
      accountDataButtons,
      accountDataFields,
      userBillingAddress,
      toggleEdit,
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
  &__firstname,
  &__lastname {
    @apply tw-col-span-6;
  }

  &__account-specific--edit-mode {
    #{$root}__email {
      @apply tw-col-span-12;
    }
  }
}
</style>
