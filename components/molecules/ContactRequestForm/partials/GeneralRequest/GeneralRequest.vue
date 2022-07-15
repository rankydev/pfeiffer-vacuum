<template>
  <div class="general-request">
    <PvInput
      :label="$t('form.contactRequest.generalRequest.forename')"
      placeholder="Placeholder"
      required="true"
    />
    <PvInput
      :label="$t('form.contactRequest.generalRequest.surname')"
      placeholder="Placeholder"
      required="true"
    />
    <PvInput
      :label="$t('form.contactRequest.generalRequest.mail')"
      placeholder="Placeholder"
      required="true"
    />
    <PvSelect
      :label="$t('form.contactRequest.generalRequest.country')"
      :options="[
        {
          displayValue: 'Deutschland',
          value: 'Deutschland',
        },
      ]"
      :option-label="'displayValue'"
    />
    <PvTextArea
      :label="$t('form.contactRequest.generalRequest.message')"
      placeholder="Placeholder"
      required="false"
    />
  </div>
</template>
<script>
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '@/components/atoms/FormComponents/PvTextArea/PvTextArea'

export default {
  name: 'GeneralRequest',
  components: { PvTextArea, PvInput, PvSelect },
}
</script>
<style lang="scss">
.general-request {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;
}
</style>
