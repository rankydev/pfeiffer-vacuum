<template>
  <div class="general-request">
    <PvInput
      :label="$t('form.contactRequest.firstname')"
      placeholder="Placeholder"
      :required="true"
      :rules="{ required }"
      :validate="validate"
      @update="
        requestData.firstname = $event
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
        requestData.surname = $event
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
        requestData.mail = $event
        $emit('update', requestData)
      "
    />
    <PvSelect
      :label="$t('form.contactRequest.country')"
      :options="[
        {
          displayValue: 'Deutschland',
          value: 'Deutschland',
        },
      ]"
      :option-label="'displayValue'"
      :required="true"
      :rules="{ required }"
      :validate="validate"
      @update="
        requestData.country = $event
        $emit('update', requestData)
      "
    />
    <PvTextArea
      :label="$t('form.contactRequest.message')"
      placeholder="Placeholder"
      :required="false"
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
      firstname: '',
      surname: '',
      country: '',
      mail: '',
      message: '',
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
