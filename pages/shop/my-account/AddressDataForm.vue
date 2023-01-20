<template>
  <div class="address-data-form">
    <FormCountrySelection
      disabled
      :selected-country="selectedCountry"
      :selected-region="selectedRegion"
    />
    <div class="address-data-form__row-container">
      <PvInput
        v-model="requestData.firstName"
        class="address-data-form__row-container--half"
        :label="$t('form.contactRequest.firstname')"
        placeholder=""
        required
        @input="$emit('update:data', requestData)"
      />
      <PvInput
        v-model="requestData.lastName"
        class="address-data-form__row-container--half"
        :label="$t('form.contactRequest.surname')"
        placeholder=""
        required
        @input="$emit('update:data', requestData)"
      />
    </div>
    <PvInput
      v-model="requestData.companyName"
      :label="$t('form.contactRequest.company')"
      placeholder=""
      required
      @input="$emit('update:data', requestData)"
    />
    <PvInput
      v-model="requestData.department"
      :label="$t('form.contactRequest.department')"
      placeholder=""
      @input="$emit('update:data', requestData)"
    />
    <div class="address-data-form__row-container">
      <PvInput
        v-model="requestData.line1"
        class="address-data-form__row-container--three-quarters"
        :label="$t('form.contactRequest.street')"
        placeholder=""
        required
        @input="$emit('update:data', requestData)"
      />
      <PvInput
        v-model="requestData.line2"
        class="address-data-form__row-container--one-quarter"
        :label="$t('form.contactRequest.houseNumber')"
        placeholder=""
        required
        @input="$emit('update:data', requestData)"
      />
    </div>
    <PvInput
      v-model="requestData.remarks"
      :label="$t('form.contactRequest.supplement')"
      placeholder=""
      @input="$emit('update:data', requestData)"
    />
    <div class="address-data-form__row-container">
      <PvInput
        v-model="requestData.postalCode"
        class="address-data-form__row-container--one-quarter"
        :label="$t('form.contactRequest.postCode')"
        placeholder=""
        required
        @input="$emit('update:data', requestData)"
      />
      <PvInput
        v-model="requestData.town"
        class="address-data-form__row-container--three-quarters"
        :label="$t('form.contactRequest.city')"
        placeholder=""
        required
        @input="$emit('update:data', requestData)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import FormCountrySelection from '~/components/molecules/FormCountrySelection/FormCountrySelection'
import { helpers, required, requiredIf } from '@vuelidate/validators'

export default defineComponent({
  name: 'AddressDataForm',
  components: {
    PvInput,
    FormCountrySelection,
  },
  props: {
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
    const addressDataObject = {
      firstName: '',
      lastName: '',
      companyName: '',
      department: '',
      line1: '',
      line2: '',
      remarks: '',
      postalCode: '',
      town: '',
    }

    const requestData = ref(addressDataObject)

    const resetForm = () => {
      emit('update:isOpen', false)
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
.address-data-form {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;

  &__row-container {
    @screen md {
      @apply tw-flex tw-flex-row;
      @apply tw-gap-4;

      &--three-quarters {
        flex-grow: 3;
        @apply tw-w-auto;
      }

      &--one-quarter {
        @apply tw-grow;
        @apply tw-w-auto;
      }

      &--half {
        @apply tw-w-6/12;
      }
    }
  }
}
</style>
