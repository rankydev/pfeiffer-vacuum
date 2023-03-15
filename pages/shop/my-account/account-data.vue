<template>
  <div class="account-data">
    <LoadingSpinner :show="isLoading">
      <ResultHeadline
        :headline="accountDataHeadline"
        :link="localePath('shop-my-account')"
      />
      <SectionHeadline :buttons="accountDataButtons" @btnClick="toggleUserEdit">
        {{ $t('myaccount.accountDataShort') }}
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
          :validation="entry.validation"
          :label="entry.label"
          :disabled="entry.disabled"
          :editable="entry.editable && isEditMode"
          :button="entry.button || null"
          @changed="dataChanged(entry.id, $event)"
        />
        <template v-if="isEditMode">
          <Button
            v-for="(btn, index) in saveAccountDataButtons"
            v-bind="btn"
            :key="index"
            class="account-data__save-account-data-mobile"
            @click="toggleUserEdit(index)"
          />
        </template>
      </div>
      <SectionHeadline>{{ $t('myaccount.companyData') }}</SectionHeadline>
      <GlobalMessage
        v-if="infoMessage"
        v-bind="infoMessage"
        :prevent-icon-change="true"
        class="account-data__info-message"
      />
      <div v-if="isLeadUser">
        <RegistrationCompanyDataForm
          :no-header="true"
          :is-open="isAddCompanyMode"
          :selected-country="userCountry"
          :selected-region="userRegion"
          @update:isOpen="toggleAddCompany"
          @update:data="setCompanyData"
        />
        <div
          v-if="isAddCompanyMode"
          class="account-data__add-company-additional"
        >
          <RegistrationPageDataProtection />
          <div class="account-data__add-company-buttons">
            <Button
              :label="$t('myaccount.saveCompanyData')"
              icon="save"
              variant="secondary"
              @click="submitCompanyData"
            />
            <Button
              :label="$t('myaccount.discard')"
              icon="close"
              variant="secondary"
              shape="outlined"
              @click="toggleAddCompany(false)"
            />
          </div>
        </div>
      </div>
      <div v-else class="account-data__company-specific">
        <MyAccountEditableTextfield
          v-for="entry in companyDataPattern"
          :key="entry.id"
          :class="'account-data__' + entry.id"
          :value="entry.value"
          :label="entry.label"
        />
      </div>
    </LoadingSpinner>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import {
  defineComponent,
  ref,
  computed,
  useContext,
} from '@nuxtjs/composition-api'
import { useUserStore } from '~/stores/user'
import { useAccountDataStore } from '~/stores/myaccount'
import { useVuelidate } from '@vuelidate/core'
import SectionHeadline from '~/components/molecules/SectionHeadline/SectionHeadline'
import MyAccountEditableTextfield from '~/components/organisms/MyAccount/partials/MyAccountEditableTextfield'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import RegistrationCompanyDataForm from '~/components/molecules/RegistrationCompanyDataForm/RegistrationCompanyDataForm'
import RegistrationPageDataProtection from '~/components/organisms/RegistrationPage/RegistrationPageDataProtection/RegistrationPageDataProtection'
import GlobalMessage from '~/components/organisms/GlobalMessage/GlobalMessage'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import { useToast } from '~/composables/useToast'

export default defineComponent({
  name: 'AccountData',
  components: {
    SectionHeadline,
    MyAccountEditableTextfield,
    LoadingSpinner,
    RegistrationCompanyDataForm,
    RegistrationPageDataProtection,
    GlobalMessage,
    ResultHeadline,
  },
  setup() {
    const { app, i18n } = useContext()
    const v = useVuelidate()
    const { isMobile } = app.$breakpoints

    // Get data from userStore
    const userStore = useUserStore()
    const {
      currentUser,
      userCountry,
      userRegion,
      isLoading,
      isLeadUser,
      isOpenUser,
      isRejectedUser,
    } = storeToRefs(userStore)
    const { updateCurrentUser } = userStore
    const toast = useToast()

    // Get data from accountDataStore
    const accountDataStore = useAccountDataStore()
    const {
      isEditMode,
      accountDataPattern,
      companyDataPattern,
      infoMessagePatterns,
      accountDataButtons,
      saveAccountDataButtons,
      addedCompanyData,
      showCompanySuccess,
    } = storeToRefs(accountDataStore)
    const { saveCompanyData } = accountDataStore

    const isAddCompanyMode = ref(false)
    const updatedData = ref({})

    const infoMessage = computed(() => {
      if (showCompanySuccess.value)
        return infoMessagePatterns.value.companyDataSuccess
      if (isOpenUser.value) return infoMessagePatterns.value.open
      if (isRejectedUser.value) return infoMessagePatterns.value.rejected
      return null
    })

    const accountDataFields = computed(() =>
      isEditMode.value
        ? accountDataPattern.value.filter((e) => !e.onlyDisplay)
        : accountDataPattern.value.filter((e) => !e.onlyEdit)
    )

    const toggleAddCompany = (val) => (isAddCompanyMode.value = val)

    const dataChanged = (field, value) => (updatedData.value[field] = value)

    const setCompanyData = (val) => (addedCompanyData.value = val?.companyData)

    const hasValidationErrors = computed(
      () => !!(v.value.$errors.length + v.value.$silentErrors.length)
    )

    const accountDataHeadline = computed(() =>
      i18n.t(
        isMobile.value
          ? 'myaccount.accountDataShort'
          : 'myaccount.accountDataLong'
      )
    )

    const toggleUserEdit = async (i) => {
      if (isEditMode.value) {
        if (i > 0) await submitAccountData()
        else isEditMode.value = false
      } else {
        isEditMode.value = true
      }
    }

    const submitCompanyData = async () => {
      await v.value.$validate()

      if (!hasValidationErrors.value) {
        saveCompanyData()
      } else {
        toast.warning({
          description: i18n.t('form.validationErrorMessages.warning'),
        })
      }
    }

    const submitAccountData = async () => {
      await v.value.$validate()

      if (!hasValidationErrors.value) {
        await updateCurrentUser({
          ...currentUser.value,
          ...updatedData.value,
        })
        isEditMode.value = false
      } else {
        toast.warning({
          description: i18n.t('form.validationErrorMessages.warning'),
        })
      }
    }

    return {
      userCountry,
      userRegion,
      companyDataPattern,
      accountDataButtons,
      accountDataFields,
      infoMessage,
      saveAccountDataButtons,
      isLeadUser,
      isLoading,
      isEditMode,
      isAddCompanyMode,
      hasValidationErrors,
      accountDataHeadline,
      isMobile,

      toggleUserEdit,
      submitCompanyData,
      toggleAddCompany,
      dataChanged,
      setCompanyData,
    }
  },
})
</script>
<style lang="scss">
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
    @apply tw-col-span-12;

    @screen md {
      @apply tw-col-span-6;
    }
  }

  &__account-specific--edit-mode {
    #{$root}__email {
      @apply tw-col-span-12;
    }
  }

  &__add-company {
    &-additional {
      @apply tw-flex tw-flex-col;
      @apply tw-mt-6;
      @apply tw-gap-6;
    }

    &-buttons {
      @apply tw-flex tw-flex-col;
      @apply tw-gap-6;

      @screen md {
        @apply tw-flex-row;
      }
    }
  }

  &__info-message {
    @apply tw-my-4;
  }

  &__save-account-data-mobile {
    @apply tw-flex;
    @apply tw-col-span-12;

    &:first-of-type {
      @apply tw-my-4;
    }

    @screen md {
      @apply tw-hidden;
    }
  }
}
</style>
