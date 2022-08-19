<template>
  <div class="registration-company-data-form">
    <div class="registration-company-data-form__header">
      <h2>{{ $t('registration.formCompanyData.title') }}</h2>
      <Button
        v-if="addCompany"
        :label="$t('registration.formCompanyData.removeCompanyData')"
        variant="secondary"
        shape="plain"
        icon="delete_forever"
        class="registration-company-data-form__add-button"
      />
    </div>

    <!-- TODO: Add infobox.vue-->
    <div class="registration-company-data-form__form">
      <ButtonGroup :values="registeredCustomerValues" />

      <PvInput
        :label="$t('registration.formCompanyData.customerNumber')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.customerNumber = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.additionalCompanyInformation')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.additionalCompanyInformation = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.department')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.department = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.tax')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.tax = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.telephoneNumber')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.telephoneNumber = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.fax')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.fax = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.street')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.address.street = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.houseNumber')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.address.houseNumber = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.postalCode')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.address.postalCode = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.city')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.address.city = $event
          $emit('update', requestData)
        "
      />
    </div>

    <div>
      <Button
        v-if="!addCompany"
        :label="$t('registration.formCompanyData.addCompanyData')"
        variant="secondary"
        shape="outlined"
        icon="domain"
        class="registration-company-data-form__add-button"
        @click="addCompany = true"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import ButtonGroup from '~/components/atoms/FormComponents/ButtonGroup/ButtonGroup'
import PvInput from '@/components/atoms/FormComponents/PvInput/PvInput'

export default defineComponent({
  name: 'RegistrationCompanyDataForm',
  components: { Button, ButtonGroup, PvInput },
  props: {
    validate: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    /**
     * Fired on keystroke.
     * @event change
     * @property {string} value
     */
    'update',
  ],
  setup() {
    const { i18n } = useContext()

    const requestData = ref({
      companyData: {
        registeredCustomer: false,
        customerNumber: '',
        additionalCompanyInformation: '',
        department: '',
        tax: '',
        telephoneNumber: '',
        fax: '',
        address: {
          country: {},
          region: {},
          street: '',
          houseNumber: '',
          postalCode: '',
          city: '',
        },
      },
    })

    const addCompany = ref(false)

    const registeredCustomerValues = [
      {
        label: i18n.t('registration.formCompanyData.registeredCustomerTrue'),
        value: true,
      },
      {
        label: i18n.t('registration.formCompanyData.registeredCustomerFalse'),
        value: false,
        checked: true,
      },
    ]

    return { requestData, addCompany, registeredCustomerValues }
  },
})
</script>

<style lang="scss">
.registration-company-data-form {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;

  &__header {
    @apply tw-flex;
    @apply tw-justify-between;
  }
}
</style>
