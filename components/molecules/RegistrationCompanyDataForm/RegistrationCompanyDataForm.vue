<template>
  <div class="registration-company-data-form">
    <div v-if="!noHeader" class="registration-company-data-form__header">
      <h2>{{ $t('registration.formCompanyData.title') }}</h2>
      <Button
        v-if="isOpen"
        :label="$t('registration.formCompanyData.removeCompanyData')"
        variant="secondary"
        shape="plain"
        icon="delete_forever"
        class="registration-company-data-form__remove-button"
        @click="resetForm"
      />
    </div>

    <Infobox :text="$t('registration.infotext')" />

    <div v-if="isOpen" class="registration-company-data-form__form-section">
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
            :selected-value="requestData.companyData.companyAlreadyCustomer"
            @update="
              requestData.companyData.companyAlreadyCustomer = $event
              $emit('update:data', requestData)
            "
          />
        </div>

        <PvInput
          v-model="requestData.companyData.companyUid"
          class="registration-company-data-form__row-container--half"
          :label="$t('registration.formCompanyData.customerNumber')"
          placeholder=""
          :disabled="!requestData.companyData.companyAlreadyCustomer"
          @input="$emit('update:data', requestData)"
        />
      </div>

      <PvInput
        v-model="requestData.companyData.companyFurtherDetails"
        :label="$t('registration.formCompanyData.additionalCompanyInformation')"
        placeholder=""
        @input="$emit('update:data', requestData)"
      />

      <PvInput
        v-model="requestData.companyData.department"
        :label="$t('registration.formCompanyData.department')"
        placeholder=""
        @input="$emit('update:data', requestData)"
      />

      <PvInput
        v-model="requestData.companyData.companyVatId"
        :label="$t('registration.formCompanyData.tax')"
        placeholder=""
        @input="$emit('update:data', requestData)"
      />

      <div class="registration-company-data-form__row-container">
        <PvInput
          v-model="requestData.companyData.phone"
          class="registration-company-data-form__row-container--half"
          :label="$t('registration.formCompanyData.telephoneNumber')"
          placeholder=""
          :required="true"
          :rules="{
            required: helpers.withMessage(
              $t('form.validationErrorMessages.required'),
              required
            ),
          }"
          @input="$emit('update:data', requestData)"
        />

        <PvInput
          v-model="requestData.companyData.fax"
          class="registration-company-data-form__row-container--half"
          :label="$t('registration.formCompanyData.fax')"
          placeholder=""
          @input="$emit('update:data', requestData)"
        />
      </div>

      <FormCountrySelection
        disabled
        :selected-country="selectedCountry"
        :selected-region="selectedRegion"
      />

      <div class="registration-company-data-form__row-container">
        <PvInput
          v-model="requestData.companyData.companyAddressStreet"
          class="registration-company-data-form__row-container--three-quarters"
          :label="$t('form.contactRequest.street')"
          placeholder=""
          :required="true"
          :rules="{
            required: helpers.withMessage(
              $t('form.validationErrorMessages.required'),
              required
            ),
          }"
          @input="$emit('update:data', requestData)"
        />

        <PvInput
          v-model="requestData.companyData.companyAddressStreetLine2"
          class="registration-company-data-form__row-container--one-quarter"
          :label="$t('form.contactRequest.houseNumber')"
          placeholder=""
          :required="true"
          :rules="{
            required: helpers.withMessage(
              $t('form.validationErrorMessages.required'),
              required
            ),
          }"
          @input="$emit('update:data', requestData)"
        />
      </div>

      <div class="registration-company-data-form__row-container">
        <PvInput
          v-model="requestData.companyData.companyAddressPostalCode"
          class="registration-company-data-form__row-container--one-quarter"
          :label="$t('form.contactRequest.postCode')"
          placeholder=""
          :required="true"
          :rules="{
            required: helpers.withMessage(
              $t('form.validationErrorMessages.required'),
              required
            ),
          }"
          @input="$emit('update:data', requestData)"
        />

        <PvInput
          v-model="requestData.companyData.companyAddressTown"
          class="registration-company-data-form__row-container--three-quarters"
          :label="$t('form.contactRequest.city')"
          placeholder=""
          :required="true"
          :rules="{
            required: helpers.withMessage(
              $t('form.validationErrorMessages.required'),
              required
            ),
          }"
          @input="$emit('update:data', requestData)"
        />
      </div>
    </div>

    <div>
      <Button
        v-if="!isOpen"
        :label="$t('registration.formCompanyData.addCompanyData')"
        variant="secondary"
        icon="domain"
        class="registration-company-data-form__add-button"
        @click="$emit('update:isOpen', true)"
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
    noHeader: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    selectedCountry: {
      type: Object,
      default: () => undefined,
    },
    selectedRegion: {
      type: Object,
      default: () => undefined,
    },
  },
  emits: [
    /**
     * Fired on keystroke.
     * @event change
     * @property {string} value
     */
    'update:data',
    'update:isOpen',
  ],
  setup(_, { emit }) {
    const companyDataObject = {
      companyData: {
        companyAlreadyCustomer: false,
        companyUid: '',
        companyFurtherDetails: '',
        department: '',
        companyVatId: '',
        phone: '',
        fax: '',
        companyAddressStreet: '',
        companyAddressStreetLine2: '',
        companyAddressPostalCode: '',
        companyAddressTown: '',
      },
    }

    const requestData = ref(companyDataObject)

    const resetForm = () => {
      emit('update:isOpen', false)
      requestData.value = {
        companyData: { companyAlreadyCustomer: false },
      }
      emit('update:data', requestData)
    }

    return {
      helpers,
      required,
      requiredIf,
      requestData,
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

  &__form-section {
    @apply tw-flex tw-flex-col;
    @apply tw-gap-4;
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
