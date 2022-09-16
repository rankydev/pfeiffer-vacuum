<template>
  <div class="form-country-selection">
    <PvSelect
      :label="$t('registration.registrationRequest.country')"
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
        loadRegions()
        $emit('update', countrySelection)
      "
    />
    <PvSelect
      v-if="regions.length"
      :label="$t('registration.registrationRequest.region')"
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
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import { useMiscStore } from '~/stores/misc'
import { useRegions } from '~/composables/useRegions'
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

    const countriesStore = useMiscStore()
    const countries = computed(() => countriesStore.countries)

    const { loadRegions, regions } = useRegions(
      computed(() => countrySelection.value.country?.isocode)
    )

    return {
      helpers,
      required,
      countrySelection,
      loadRegions,
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
