<template>
  <div class="general-request">
    <PvInput label="Vorname" placeholder="Placeholder" required="true" />
    <PvInput label="Nachname" placeholder="Placeholder" required="true" />
    <PvInput label="E-Mail" placeholder="Placeholder" required="true" />
    <PvSelect
      label="Land"
      :options="[
        {
          displayValue: 'Deutschland',
          value: 'Deutschland',
        },
      ]"
      :option-label="'label'"
    />
    <PvTextArea
      label="Ihre Nachricht"
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
