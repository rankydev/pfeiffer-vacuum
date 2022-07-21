<template>
  <div class="topic-request">
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
      :label="$t('form.contactRequest.company')"
      placeholder="Placeholder"
      :required="true"
      :rules="{ required }"
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
    <div class="topic-request__address">
      <PvInput
        class="topic-request__address--street"
        :label="$t('form.contactRequest.street')"
        placeholder="Placeholder"
        :required="true"
      />
      <PvInput
        class="topic-request__address--number"
        :label="$t('form.contactRequest.houseNumber')"
        placeholder="Placeholder"
        :required="true"
        :rules="{ required }"
      />
    </div>
    <div class="topic-request__address">
      <PvInput
        class="topic-request__address--postcode"
        :label="$t('form.contactRequest.postCode')"
        placeholder="Placeholder"
        :required="true"
        :rules="{ required }"
      />
      <PvInput
        class="topic-request__address--city"
        :label="$t('form.contactRequest.city')"
        placeholder="Placeholder"
        :required="true"
        :rules="{ required }"
      />
    </div>
    <PvInput
      :label="$t('form.contactRequest.mail')"
      placeholder="Placeholder"
      :required="true"
      :rules="{ required, email }"
    />
    <PvTextArea
      :label="$t('form.contactRequest.message')"
      placeholder="Placeholder"
      :required="false"
      :rules="{ required }"
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
  name: 'TopicRequest',
  components: { PvTextArea, PvInput, PvSelect },
  setup() {
    return { required, email }
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
