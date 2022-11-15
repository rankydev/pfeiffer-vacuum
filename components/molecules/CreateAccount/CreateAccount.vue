<template>
  <div class="create-account">
    <h2>
      {{ $t('registration.registrationRequest.title') }}
    </h2>

    <PvInput
      v-model="requestData.registration.companyName"
      :label="$t('form.contactRequest.company')"
      placeholder="Placeholder"
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
      placeholder="Placeholder"
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
      placeholder="Placeholder"
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
      placeholder="Placeholder"
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
      placeholder="Placeholder"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :show-validation-criterias="true"
      @input="$emit('update', requestData)"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import Password from '~/components/atoms/FormComponents/Password/Password'
import FormCountrySelection from '~/components/molecules/FormCountrySelection/FormCountrySelection'
import { required, email, helpers } from '@vuelidate/validators'

export default defineComponent({
  name: 'CreateAccount',
  components: { PvInput, Password, FormCountrySelection },
  props: {
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
