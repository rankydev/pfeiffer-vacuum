<template>
  <div class="general-request">
    <PvInput
      :label="$t('form.contactRequest.firstname')"
      placeholder="Placeholder"
      :required="true"
      :rules="{ required }"
      :validate="validate"
      @update="
        requestData.contact.firstName = $event
        $emit('update', requestData)
      "
    />
    <PvInput
      :label="$t('form.contactRequest.surname')"
      placeholder="Placeholder"
      :required="true"
      :rules="{ required }"
      :validate="validate"
      @update="
        requestData.contact.lastName = $event
        $emit('update', requestData)
      "
    />
    <PvInput
      :label="$t('form.contactRequest.mail')"
      placeholder="Placeholder"
      :required="true"
      :rules="{ required, email }"
      :validate="validate"
      @update="
        requestData.contact.email = $event
        $emit('update', requestData)
      "
    />
    <PvSelect
      :label="$t('form.contactRequest.country')"
      :options="countries"
      :option-label="'name'"
      :required="true"
      :rules="{ required }"
      :validate="validate"
      @update="
        requestData.contact.address.country = $event
        $emit('update', requestData)
      "
    />
    <PvSelect
      v-if="regions.length"
      :label="$t('form.contactRequest.region')"
      :options="regions"
      :option-label="'name'"
      :required="true"
      :rules="{ required }"
      :validate="validate"
      @update="
        requestData.contact.address.region = $event
        $emit('update', requestData)
      "
    />
    <PvTextArea
      :label="$t('form.contactRequest.message')"
      placeholder="Placeholder"
      :required="true"
      @update="
        requestData.message = $event
        $emit('update', requestData)
      "
    />
  </div>
</template>
<script>
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { required, email } from '@vuelidate/validators'

export default defineComponent({
  name: 'GeneralRequest',
  components: { PvTextArea, PvInput, PvSelect },
  props: {
    /**
     * determines whether a validation can be executed and will be passed into child component
     */
    validate: {
      type: Boolean,
      default: false,
    },
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
    countries: {
      type: Array,
      default: () => [],
    },
    regions: {
      type: Array,
      default: () => [],
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
          country: {},
          region: {},
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

    return { required, email, requestData }
  },
})
</script>
<style lang="scss">
.general-request {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;
}
</style>
