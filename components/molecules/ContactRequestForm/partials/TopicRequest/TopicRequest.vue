<template>
  <div class="topic-request">
    <PvInput
      :label="$t('form.contactRequest.firstname')"
      placeholder="Placeholder"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
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
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :validate="validate"
      @update="
        requestData.contact.lastName = $event
        $emit('update', requestData)
      "
    />
    <PvInput
      :label="$t('form.contactRequest.company')"
      placeholder="Placeholder"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :validate="validate"
      @update="
        requestData.contact.address.companyName = $event
        $emit('update', requestData)
      "
    />
    <PvSelect
      :label="$t('form.contactRequest.country')"
      :options="countries"
      :option-label="'name'"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :validate="validate"
      @update="
        requestData.contact.address.country = $event
        loadRegions()
        $emit('update', requestData)
      "
    />
    <PvSelect
      v-if="regions.length"
      :label="$t('form.contactRequest.region')"
      :options="regions"
      :option-label="'name'"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :validate="validate"
      @update="
        requestData.contact.address.region = $event
        $emit('update', requestData)
      "
    />
    <div class="topic-request__address">
      <PvInput
        class="topic-request__address--street"
        :label="$t('form.contactRequest.street')"
        placeholder="Placeholder"
        :required="true"
        :rules="{
          required: helpers.withMessage(
            $t('form.validationErrorMessages.required'),
            required
          ),
        }"
        :validate="validate"
        @update="
          requestData.contact.address.line1 = $event
          $emit('update', requestData)
        "
      />
      <PvInput
        class="topic-request__address--number"
        :label="$t('form.contactRequest.houseNumber')"
        placeholder="Placeholder"
        :required="true"
        :rules="{
          required: helpers.withMessage(
            $t('form.validationErrorMessages.required'),
            required
          ),
        }"
        :validate="validate"
        @update="
          requestData.contact.address.line2 = $event
          $emit('update', requestData)
        "
      />
    </div>
    <div class="topic-request__address">
      <PvInput
        class="topic-request__address--postcode"
        :label="$t('form.contactRequest.postCode')"
        placeholder="Placeholder"
        :required="true"
        :rules="{
          required: helpers.withMessage(
            $t('form.validationErrorMessages.required'),
            required
          ),
        }"
        :validate="validate"
        @update="
          requestData.contact.address.postalCode = $event
          $emit('update', requestData)
        "
      />
      <PvInput
        class="topic-request__address--city"
        :label="$t('form.contactRequest.city')"
        placeholder="Placeholder"
        :required="true"
        :rules="{
          required: helpers.withMessage(
            $t('form.validationErrorMessages.required'),
            required
          ),
        }"
        :validate="validate"
        @update="
          requestData.contact.address.town = $event
          $emit('update', requestData)
        "
      />
    </div>
    <PvInput
      :label="$t('form.contactRequest.mail')"
      placeholder="Placeholder"
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
      :validate="validate"
      @update="
        requestData.contact.email = $event
        $emit('update', requestData)
      "
    />
    <PvTextArea
      :label="$t('form.contactRequest.message')"
      placeholder="Placeholder"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :validate="validate"
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
import { computed, defineComponent, ref, toRef } from '@nuxtjs/composition-api'
import { required, email, helpers } from '@vuelidate/validators'
import { useCountriesStore } from '~/stores/countries'

export default defineComponent({
  name: 'TopicRequest',
  components: { PvTextArea, PvInput, PvSelect },
  props: {
    validate: {
      type: Boolean,
      default: false,
    },
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
          country: {},
          region: {},
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

    const countriesStore = useCountriesStore()
    const isoCode = computed(
      () => requestData.value.contact?.address?.country?.isocode
    )
    const regions = computed(() => countriesStore.regions[isoCode.value] || [])
    const countries = toRef(countriesStore, 'countries')

    const loadRegions = () => {
      countriesStore.loadRegions(isoCode.value)
    }

    return {
      required,
      email,
      helpers,
      requestData,
      loadRegions,
      regions,
      countries,
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
