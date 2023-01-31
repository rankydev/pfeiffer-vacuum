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
        class="row-container-item row-container-item__half"
        :label="$t('form.contactRequest.firstname')"
        :placeholder="$t('form.contactRequest.firstname')"
        required
        :rules="{ requiredIfNoCompany }"
      />
      <PvInput
        v-model="requestData.lastName"
        class="row-container-item row-container-item__half"
        :label="$t('form.contactRequest.surname')"
        :placeholder="$t('form.contactRequest.surname')"
        required
        :rules="{ requiredIfNoCompany }"
      />
    </div>
    <PvInput
      v-model="requestData.companyName"
      :label="$t('form.contactRequest.company')"
      :placeholder="$t('form.contactRequest.company')"
      required
      :rules="{ requiredIfNoNameInformation }"
    />
    <PvInput
      v-model="requestData.department"
      :label="$t('form.contactRequest.department')"
      :placeholder="$t('form.contactRequest.department')"
    />
    <div class="address-data-form__row-container">
      <PvInput
        v-model="requestData.line1"
        class="row-container-item row-container-item__three-quarters"
        :label="$t('form.contactRequest.street')"
        :placeholder="$t('form.contactRequest.street')"
        required
        :rules="{ requiredWithMessage, maxLength: maxLength(255) }"
      />
      <PvInput
        v-model="requestData.line2"
        class="row-container-item row-container-item__one-quarter"
        :label="$t('form.contactRequest.houseNumber')"
        :placeholder="$t('form.contactRequest.houseNumber')"
      />
    </div>
    <PvInput
      v-model="requestData.remarks"
      :label="$t('form.contactRequest.supplement')"
      :placeholder="$t('form.contactRequest.supplement')"
    />
    <div class="address-data-form__row-container">
      <PvInput
        v-model="requestData.postalCode"
        class="row-container-item row-container-item__one-quarter"
        :label="$t('form.contactRequest.postCode')"
        :placeholder="$t('form.contactRequest.postCode')"
        required
        :rules="{ requiredWithMessage, maxLength: maxLength(10) }"
      />
      <PvInput
        v-model="requestData.town"
        class="row-container-item row-container-item__three-quarters"
        :label="$t('form.contactRequest.city')"
        :placeholder="$t('form.contactRequest.city')"
        required
        :rules="{ requiredWithMessage, maxLength: maxLength(255) }"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  useContext,
  toRefs,
} from '@nuxtjs/composition-api'
import PvInput from '@/components/atoms/FormComponents/PvInput/PvInput'
import FormCountrySelection from '@/components/molecules/FormCountrySelection/FormCountrySelection'
import {
  helpers,
  required,
  requiredUnless,
  maxLength,
} from '@vuelidate/validators'

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
  setup(props) {
    // please note: request data === addressData since objects are parsed by reference (even as props)
    // so every v-model in the template will instantly mutate the parent addressData object
    const { addressData } = toRefs(props)
    const requestData = ref(addressData)

    const { i18n } = useContext()

    const requiredWithMessage = helpers.withMessage(
      i18n.t('form.validationErrorMessages.required'),
      required
    )

    const requiredIfNoCompany = helpers.withMessage(
      i18n.t('form.validationErrorMessages.requiredNameOrCompany'),
      requiredUnless(computed(() => !!requestData.value.companyName))
    )

    const requiredIfNoNameInformation = helpers.withMessage(
      i18n.t('form.validationErrorMessages.requiredNameOrCompany'),
      requiredUnless(
        computed(
          () => !!requestData.value.firstName && !!requestData.value.lastName
        )
      )
    )

    return {
      helpers,
      requiredWithMessage,
      requiredIfNoCompany,
      requiredIfNoNameInformation,
      maxLength,
      requestData,
    }
  },
})
</script>

<style lang="scss" scoped>
.address-data-form {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;

  &__row-container {
    @apply tw-flex tw-flex-wrap;
    @apply tw-gap-4;

    @screen md {
      @apply tw-flex tw-flex-row;
    }
  }

  .row-container-item {
    @apply tw-w-full;

    @screen md {
      &__three-quarters {
        flex-grow: 3;
        width: auto !important;
      }

      &__one-quarter {
        @apply tw-grow;
        width: auto !important;
      }

      &__half {
        @apply tw-grow;
        width: auto !important;
      }
    }
  }
}
</style>
