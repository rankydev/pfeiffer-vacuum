<template>
  <div>
    <PvInput label="Vorname" placeholder="Placeholder" required="true" />
    <br />
    <PvInput label="Nachname" placeholder="Placeholder" required="true" />
    <br />
    <PvInput label="E-Mail" placeholder="Placeholder" required="true" />
    <br />
    <PvSelect
      label="Land"
      :options="[
        {
          displayValue: 'Deutschland',
          value: 'Deutschland',
        },
      ]"
    />
    <br />
    <TextArea
      label="Ihre Nachricht"
      placeholder="Placeholder"
      required="false"
    />
  </div>
</template>
<script>
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import TextArea from '~/components/atoms/FormComponents/TextArea/TextArea'

export default {
  name: 'GeneralRequest',
  components: { TextArea, PvInput, PvSelect },
}
</script>
<style lang="scss"></style>
