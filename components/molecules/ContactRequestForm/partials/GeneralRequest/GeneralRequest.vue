<template>
  <div class="general-request">
    <PvInput
      :label="$t('form.contactRequest.firstname')"
      placeholder="Placeholder"
      :required="true"
      :has-error="!!validation.getError('firstname')"
      :error-message="validation.getError('firstname')"
      @update="
        validation.formData.firstname = $event
        validation.validateInput()
      "
    />

    {{ validation.formData.firstname }}
    <pre>{{ validation.v$.$errors }}</pre>

    <PvInput
      :label="$t('form.contactRequest.surname')"
      placeholder="Placeholder"
      :required="true"
    />
    <PvInput
      :label="$t('form.contactRequest.mail')"
      placeholder="Placeholder"
      :required="true"
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
    />
    <PvTextArea
      :label="$t('form.contactRequest.message')"
      placeholder="Placeholder"
      :required="false"
    />
  </div>
</template>
<script>
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'
import { defineComponent } from '@nuxtjs/composition-api'
import useInputValidator from '~/composables/useValidator'
import { ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GeneralRequest',
  components: { PvTextArea, PvInput, PvSelect },

  setup() {
    const validation = ref(useInputValidator())

    return {
      validation,
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
