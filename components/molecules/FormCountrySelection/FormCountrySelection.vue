<template>
  <div class="form-country-selection">
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
        countrySelection.country = $event
        $emit('update', countrySelection)
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
        countrySelection.region = $event
        $emit('update', countrySelection)
      "
    />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  toRef,
  watch,
} from '@nuxtjs/composition-api'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import { useCountriesStore } from '~/stores/countries'
import { helpers, required } from '@vuelidate/validators'

export default defineComponent({
  name: 'FormCountrySelection',
  components: { PvSelect },
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
    const countrySelection = ref({
      country: {},
      region: {},
    })

    const countriesStore = useCountriesStore()
    const isoCode = computed(() => countrySelection.value.country?.isocode)
    const regions = ref([])
    const countries = toRef(countriesStore, 'countries')

    watch(isoCode, async (newIsoCode) => {
      await countriesStore.loadRegions(newIsoCode)
      regions.value = countriesStore.regions[newIsoCode] || []
    })

    return {
      helpers,
      required,
      countrySelection,
      regions,
      countries,
    }
  },
})
</script>

<style lang="scss">
.form-country-selection {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;
}
</style>
