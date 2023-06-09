<template>
  <div class="create-account">
    <h2>
      {{ $t(headline) }}
    </h2>

    <p v-if="description">{{ description }}</p>

    <PvInput
      v-model="requestData.registration.companyName"
      :label="$t('form.contactRequest.company')"
      :placeholder="$t('form.placeholder.company')"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      @input="$emit('update', requestData)"
    />

    <FormCountrySelection
      :selected-country="selectedCountry"
      :selected-region="selectedRegion"
      @update="
        requestData.registration.address = $event
        $emit('update', requestData)
      "
    />

    <PvInput
      v-model="requestData.registration.firstName"
      :label="$t('form.contactRequest.firstname')"
      :placeholder="$t('form.placeholder.firstname')"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      @input="$emit('update', requestData)"
    />

    <PvInput
      v-model="requestData.registration.lastName"
      :label="$t('form.contactRequest.surname')"
      :placeholder="$t('form.placeholder.lastname')"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      @input="$emit('update', requestData)"
    />

    <PvInput
      v-model="requestData.registration.email"
      :label="$t('form.contactRequest.mail')"
      :placeholder="$t('form.placeholder.email')"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
        email: helpers.withMessage(
          $t('form.validationErrorMessages.email'),
          email
        ),
      }"
      @input="$emit('update', requestData)"
    />

    <Password
      v-model="requestData.registration.password"
      :label="$t('registration.registrationRequest.password')"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :show-validation-criterias="true"
      @input="$emit('update', requestData)"
      @error="requestData.errors.password = $event"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { required, email, helpers } from '@vuelidate/validators'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import Password from '~/components/atoms/FormComponents/Password/Password'
import FormCountrySelection from '~/components/molecules/FormCountrySelection/FormCountrySelection'

export default defineComponent({
  name: 'CreateAccount',
  components: { PvInput, Password, FormCountrySelection },
  props: {
    headline: {
      type: String,
      default: 'registration.registrationRequest.title',
    },
    description: {
      type: String,
      default: '',
    },
    selectedCountry: {
      type: Object,
      default: undefined,
    },
    selectedRegion: {
      type: Object,
      default: undefined,
    },
  },
  emits: [
    /**
     * Fired on keystroke.
     *
     * @event change
     * @property {string} value
     */
    'update',
  ],
  setup() {
    const requestData = ref({
      registration: {
        companyName: '',
        address: {
          country: undefined,
          region: undefined,
        },
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      errors: {
        password: false,
      },
    })

    return {
      required,
      email,
      helpers,
      requestData,
    }
  },
})
</script>
<style lang="scss">
.create-account {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;
}
</style>
