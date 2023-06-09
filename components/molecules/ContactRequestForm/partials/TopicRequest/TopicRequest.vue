<template>
  <div class="topic-request">
    <PvInput
      v-model="requestData.contact.firstName"
      :label="$t('form.contactRequest.firstname')"
      :placeholder="$t('form.contactRequest.firstname')"
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
      :placeholder="$t('form.contactRequest.surname')"
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
      v-model="requestData.contact.address.companyName"
      :label="$t('form.contactRequest.company')"
      :placeholder="$t('form.contactRequest.company')"
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
      :selected-country="requestData.contact.address.country"
      :selected-region="requestData.contact.address.region"
      @update="
        requestData.contact.address.country = $event.country
        requestData.contact.address.region = $event.region
        $emit('update', requestData)
      "
    />
    <div class="topic-request__address">
      <PvInput
        v-model="requestData.contact.address.line1"
        class="topic-request__address--street"
        :label="$t('form.contactRequest.street')"
        :placeholder="$t('form.contactRequest.street')"
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
        v-model="requestData.contact.address.line2"
        class="topic-request__address--number"
        :label="$t('form.contactRequest.houseNumber')"
        :placeholder="$t('form.contactRequest.houseNumber')"
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
    <div class="topic-request__address">
      <PvInput
        v-model="requestData.contact.address.postalCode"
        class="topic-request__address--postcode"
        :label="$t('form.contactRequest.postCode')"
        :placeholder="$t('form.contactRequest.postCode')"
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
        v-model="requestData.contact.address.town"
        class="topic-request__address--city"
        :label="$t('form.contactRequest.city')"
        :placeholder="$t('form.contactRequest.city')"
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
    <PvInput
      v-model="requestData.contact.email"
      :label="$t('form.contactRequest.mail')"
      :placeholder="$t('form.contactRequest.mail')"
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
    <PvTextArea
      v-model="requestData.message"
      :label="$t('form.contactRequest.message')"
      :placeholder="$t('form.contactRequest.message')"
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
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { required, email, helpers } from '@vuelidate/validators'
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'
import FormCountrySelection from '~/components/molecules/FormCountrySelection/FormCountrySelection'

export default defineComponent({
  name: 'TopicRequest',
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
          town: '',
          postalCode: '',
          line1: '',
          line2: '',
          companyName: '',
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
.topic-request {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;

  &__address {
    @apply tw-flex tw-flex-row;
    @apply tw-gap-4;

    &--street {
      flex-grow: 2;
    }

    &--number {
      flex-grow: 1;
    }

    &--postcode {
      flex-grow: 1;
    }

    &--city {
      flex-grow: 2;
    }
  }
}
</style>
