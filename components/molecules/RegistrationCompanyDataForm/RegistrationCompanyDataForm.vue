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
        class="registration-company-data-form__remove-button"
        @click="resetForm"
      />
    </div>

    <Infobox :text="$t('registration.infotext')" />

    <div v-if="addCompany">
      <div class="registration-company-data-form__row-container">
        <div class="registration-company-data-form__row-container--half">
          <PvLabel
            :label="$t('registration.formCompanyData.registeredCustomer')"
          />
          <ButtonGroup
            :values="[
              {
                label: $t(
                  'registration.formCompanyData.registeredCustomerTrue'
                ),
                value: true,
              },
              {
                label: $t(
                  'registration.formCompanyData.registeredCustomerFalse'
                ),
                value: false,
                checked: true,
              },
            ]"
            @update="
              requestData.companyData.registeredCustomer = $event
              $emit('update', requestData)
            "
          />
        </div>

        <PvInput
          class="registration-company-data-form__row-container--half"
          :label="$t('registration.formCompanyData.customerNumber')"
          placeholder=""
          :validate="validate"
          :disabled="!requestData.companyData.registeredCustomer"
          @update="
            requestData.companyData.customerNumber = $event
            $emit('update', requestData)
          "
        />
      </div>

      <PvInput
        :label="$t('registration.formCompanyData.additionalCompanyInformation')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.companyData.additionalCompanyInformation = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.department')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.companyData.department = $event
          $emit('update', requestData)
        "
      />

      <PvInput
        :label="$t('registration.formCompanyData.tax')"
        placeholder=""
        :validate="validate"
        @update="
          requestData.companyData.tax = $event
          $emit('update', requestData)
        "
      />

      <div class="registration-company-data-form__row-container">
        <PvInput
          class="registration-company-data-form__row-container--half"
          :label="$t('registration.formCompanyData.telephoneNumber')"
          placeholder=""
          :required="true"
          :validate="validate"
          :rules="{
            required: helpers.withMessage(
              $t('form.validationErrorMessages.required'),
              required
            ),
          }"
          @update="
            requestData.companyData.telephoneNumber = $event
            $emit('update', requestData)
          "
        />

        <PvInput
          class="registration-company-data-form__row-container--half"
          :label="$t('registration.formCompanyData.fax')"
          placeholder=""
          :validate="validate"
          @update="
            requestData.companyData.fax = $event
            $emit('update', requestData)
          "
        />
      </div>

      <FormCountrySelection
        @update="
          requestData.companyData.address.countrySelection = $event
          $emit('update', requestData)
        "
      />

      <div class="registration-company-data-form__row-container">
        <PvInput
          class="registration-company-data-form__row-container--three-quarters"
          :label="$t('registration.formCompanyData.street')"
          placeholder=""
          :required="true"
          :rules="{
            required: helpers.withMessage(
              $t('form.validationErrorMessages.required'),
              required
            ),
          }"
          :validate="validate"
          @update="
            requestData.companyData.address.street = $event
            $emit('update', requestData)
          "
        />

        <PvInput
          class="registration-company-data-form__row-container--one-quarter"
          :label="$t('registration.formCompanyData.houseNumber')"
          placeholder=""
          :required="true"
          :rules="{
            required: helpers.withMessage(
              $t('form.validationErrorMessages.required'),
              required
            ),
          }"
          :validate="validate"
          @update="
            requestData.companyData.address.houseNumber = $event
            $emit('update', requestData)
          "
        />
      </div>

      <div class="registration-company-data-form__row-container">
        <PvInput
          class="registration-company-data-form__row-container--one-quarter"
          :label="$t('registration.formCompanyData.postalCode')"
          placeholder=""
          :required="true"
          :rules="{
            required: helpers.withMessage(
              $t('form.validationErrorMessages.required'),
              required
            ),
          }"
          :validate="validate"
          @update="
            requestData.companyData.address.postalCode = $event
            $emit('update', requestData)
          "
        />

        <PvInput
          class="registration-company-data-form__row-container--three-quarters"
          :label="$t('registration.formCompanyData.city')"
          placeholder=""
          :required="true"
          :rules="{
            required: helpers.withMessage(
              $t('form.validationErrorMessages.required'),
              required
            ),
          }"
          :validate="validate"
          @update="
            requestData.companyData.address.city = $event
            $emit('update', requestData)
          "
        />
      </div>
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
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'
import ButtonGroup from '~/components/atoms/FormComponents/ButtonGroup/ButtonGroup'
import FormCountrySelection from '~/components/molecules/FormCountrySelection/FormCountrySelection'
import Infobox from '~/components/molecules/Infobox/Infobox'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvLabel from '~/components/atoms/FormComponents/partials/PvLabel/PvLabel'
import { required, requiredIf, helpers } from '@vuelidate/validators'

export default defineComponent({
  name: 'RegistrationCompanyDataForm',
  components: {
    Button,
    ButtonGroup,
    PvInput,
    FormCountrySelection,
    Infobox,
    PvLabel,
  },
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
  setup(_, { emit }) {
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
          countrySelection: {
            country: {},
            region: {},
          },
          street: '',
          houseNumber: '',
          postalCode: '',
          city: '',
        },
      },
    })

    const addCompany = ref(false)

    const resetForm = () => {
      requestData.value = {
        companyData: {
          registeredCustomer: false,
          customerNumber: '',
          additionalCompanyInformation: '',
          department: '',
          tax: '',
          telephoneNumber: '',
          fax: '',
          address: {
            countrySelection: {
              country: {},
              region: {},
            },
            street: '',
            houseNumber: '',
            postalCode: '',
            city: '',
          },
        },
      }

      addCompany.value = false
      emit('update', requestData)
    }

    const registeredCustomerValues = []

    return {
      helpers,
      required,
      requiredIf,
      requestData,
      addCompany,
      registeredCustomerValues,
      resetForm,
    }
  },
})
</script>

<style lang="scss">
.registration-company-data-form {
  @apply tw-flex tw-flex-col;

  &__header {
    @apply tw-flex;
    @apply tw-justify-between;
  }

  &__row-container {
    @screen md {
      @apply tw-flex tw-flex-row;
      @apply tw-gap-4;

      &--three-quarters {
        flex-grow: 3;
      }

      &--one-quarter {
        @apply tw-grow;
      }

      &--half {
        @apply tw-w-6/12;
      }
    }
  }

  &__add-button {
    @apply tw-mt-3;
  }
}
</style>
