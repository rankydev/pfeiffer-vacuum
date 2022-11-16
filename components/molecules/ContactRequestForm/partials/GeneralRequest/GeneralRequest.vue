<template>
  <div class="general-request">
    <PvInput
      v-model="requestData.contact.firstName"
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
      v-model="requestData.contact.lastName"
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
      v-model="requestData.contact.email"
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
    <FormCountrySelection
      :selected-country="requestData.contact.address.country"
      :selected-region="requestData.contact.address.region"
      @update="
        requestData.contact.address.country = $event.country
        requestData.contact.address.region = $event.region
        $emit('update', requestData)
      "
    />
    <PvTextArea
      v-model="requestData.message"
      :label="$t('form.contactRequest.message')"
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
  </div>
</template>
<script>
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import FormCountrySelection from '~/components/molecules/FormCountrySelection/FormCountrySelection'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { required, email, helpers } from '@vuelidate/validators'

export default defineComponent({
  name: 'GeneralRequest',
  components: { PvTextArea, PvInput, FormCountrySelection },
  props: {
    /**
     * defines what kind of request type is selected
     */
    type: {
      type: String,
      required: true,
      validator: (val) =>
        [
          'QUOTE',
          'SERVICE_REQUEST',
          'PRODUCT_INFORMATION',
          'GENERAL_QUERY',
        ].includes(val),
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
  setup(props) {
    const requestData = ref({
      contact: {
        address: {
          country: undefined,
          region: undefined,
        },
        firstName: '',
        lastName: '',
        email: '',
      },
      message: '',
      type: {
        code: props.type,
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
.general-request {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;
}
</style>
