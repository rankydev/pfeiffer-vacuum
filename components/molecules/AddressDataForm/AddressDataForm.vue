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
        :placeholder="$t('form.contactRequest.firstname')"
        required
        @input="$emit('update:data', requestData)"
      />
      <PvInput
        v-model="requestData.lastName"
        class="address-data-form__row-container--half"
        :label="$t('form.contactRequest.surname')"
        :placeholder="$t('form.contactRequest.surname')"
        required
        @input="$emit('update:data', requestData)"
      />
    </div>
    <PvInput
      v-model="requestData.companyName"
      :label="$t('form.contactRequest.company')"
      :placeholder="$t('form.contactRequest.company')"
      required
      @input="$emit('update:data', requestData)"
    />
    <PvInput
      v-model="requestData.department"
      :label="$t('form.contactRequest.department')"
      :placeholder="$t('form.contactRequest.department')"
      @input="$emit('update:data', requestData)"
    />
    <div class="address-data-form__row-container">
      <PvInput
        v-model="requestData.line1"
        class="address-data-form__row-container--three-quarters"
        :label="$t('form.contactRequest.street')"
        :placeholder="$t('form.contactRequest.street')"
        required
        @input="$emit('update:data', requestData)"
      />
      <PvInput
        v-model="requestData.line2"
        class="address-data-form__row-container--one-quarter"
        :label="$t('form.contactRequest.houseNumber')"
        :placeholder="$t('form.contactRequest.houseNumber')"
        required
        @input="$emit('update:data', requestData)"
      />
    </div>
    <PvInput
      v-model="requestData.remarks"
      :label="$t('form.contactRequest.supplement')"
      :placeholder="$t('form.contactRequest.supplement')"
      @input="$emit('update:data', requestData)"
    />
    <div class="address-data-form__row-container">
      <PvInput
        v-model="requestData.postalCode"
        class="address-data-form__row-container--one-quarter"
        :label="$t('form.contactRequest.postCode')"
        :placeholder="$t('form.contactRequest.postCode')"
        required
        @input="$emit('update:data', requestData)"
      />
      <PvInput
        v-model="requestData.town"
        class="address-data-form__row-container--three-quarters"
        :label="$t('form.contactRequest.city')"
        :placeholder="$t('form.contactRequest.city')"
        required
        @input="$emit('update:data', requestData)"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, toRefs } from '@nuxtjs/composition-api'
import PvInput from '@/components/atoms/FormComponents/PvInput/PvInput'
import FormCountrySelection from '@/components/molecules/FormCountrySelection/FormCountrySelection'
import { helpers, required, requiredIf } from '@vuelidate/validators'

export default defineComponent({
  name: 'AddressDataForm',
  components: {
    PvInput,
    FormCountrySelection,
  },
  props: {
    selectedCountry: {
      type: Object,
      default: () => undefined,
    },
    selectedRegion: {
      type: Object,
      default: () => undefined,
    },
    addressData: {
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
  setup(props, { emit }) {
    const { addressData } = toRefs(props)
    const hasAddressData = computed(() => Object.keys(addressData).length)
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

    const requestData = ref(
      hasAddressData.value ? addressData : addressDataObject
    )

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
    @apply tw-flex tw-flex-wrap;
    @apply tw-gap-4;

    @screen md {
      @apply tw-flex tw-flex-row;

      &--three-quarters {
        flex-grow: 3;
        width: auto !important;
      }

      &--one-quarter {
        @apply tw-grow;
        width: auto !important;
      }

      &--half {
        @apply tw-w-6/12;
      }
    }
  }
}
</style>
