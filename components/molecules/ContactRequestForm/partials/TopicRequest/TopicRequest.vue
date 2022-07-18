<template>
  <div class="topic-request">
    <PvInput
      :label="$t('form.contactRequest.forename')"
      placeholder="Placeholder"
      required="true"
    />
    <PvInput
      :label="$t('form.contactRequest.surname')"
      placeholder="Placeholder"
      required="true"
    />
    <PvInput
      :label="$t('form.contactRequest.company')"
      placeholder="Placeholder"
      required="true"
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
    <div class="topic-request__address">
      <PvInput
        class="topic-request__address--street"
        :label="$t('form.contactRequest.street')"
        placeholder="Placeholder"
        required="true"
      />
      <PvInput
        class="topic-request__address--number"
        :label="$t('form.contactRequest.houseNumber')"
        placeholder="Placeholder"
        required="true"
      />
    </div>
    <div class="topic-request__address">
      <PvInput
        class="topic-request__address--postcode"
        :label="$t('form.contactRequest.postCode')"
        placeholder="Placeholder"
        required="true"
      />
      <PvInput
        class="topic-request__address--city"
        :label="$t('form.contactRequest.city')"
        placeholder="Placeholder"
        required="true"
      />
    </div>
    <PvInput
      :label="$t('form.contactRequest.mail')"
      placeholder="Placeholder"
      required="true"
    />
    <PvTextArea
      :label="$t('form.contactRequest.message')"
      placeholder="Placeholder"
      required="false"
    />
  </div>
</template>
<script>
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TopicRequest',
  components: { PvTextArea, PvInput, PvSelect },
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
