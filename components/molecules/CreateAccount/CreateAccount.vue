<template>
  <div class="create-account">
    <h2>
      {{ $t('registration.registrationRequest.title') }}
    </h2>

    <PvInput
      :label="$t('form.contactRequest.company')"
      placeholder="Placeholder"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :validate="validate"
      @update="
        requestData.registration.companyName = $event
        $emit('update', requestData)
      "
    />

    <FormCountrySelection
      :validate="validate"
      @update="
        requestData.registration.address = $event
        $emit('update', requestData)
      "
    />

    <PvInput
      :label="$t('form.contactRequest.firstname')"
      placeholder="Placeholder"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :validate="validate"
      @update="
        requestData.registration.firstName = $event
        $emit('update', requestData)
      "
    />

    <PvInput
      :label="$t('form.contactRequest.surname')"
      placeholder="Placeholder"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :validate="validate"
      @update="
        requestData.registration.lastName = $event
        $emit('update', requestData)
      "
    />

    <PvInput
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
      :validate="validate"
      @update="
        requestData.registration.email = $event
        $emit('update', requestData)
      "
    />

    <Password
      :label="$t('registration.registrationRequest.password')"
      placeholder="Placeholder"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :validate="validate"
      :show-validation-criterias="true"
      @update="
        requestData.registration.password = $event
        $emit('update', requestData)
      "
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
    /**
     * determines whether a validation can be executed and will be passed into child component
     */
    validate: {
      type: Boolean,
      default: false,
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
          country: {},
          region: {},
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
