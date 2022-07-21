<template>
  <div class="general-request">
    <PvInput
      :label="$t('form.contactRequest.firstname')"
      placeholder="Placeholder"
      :required="true"
      :rules="{ required }"
    />
    <PvInput
      :label="$t('form.contactRequest.surname')"
      placeholder="Placeholder"
      :required="true"
      :rules="{ required }"
    />
    <PvInput
      :label="$t('form.contactRequest.mail')"
      placeholder="Placeholder"
      :required="true"
      :rules="{ required, email }"
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
      :rules="{ required }"
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
import { required, email } from '@vuelidate/validators'

export default defineComponent({
  name: 'GeneralRequest',
  components: { PvTextArea, PvInput, PvSelect },
  setup() {
    return { required, email }
  },
})
</script>
<style lang="scss">
.general-request {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;
}
</style>
