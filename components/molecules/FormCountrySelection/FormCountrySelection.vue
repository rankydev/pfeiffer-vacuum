<template>
  <div class="form-country-selection">
    <PvSelect
      v-model="internalCountry"
      :label="$t('form.contactRequest.country')"
      :options="countries"
      :option-label="'name'"
      :required="true"
      :disabled="disabled"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
    />
    <PvSelect
      v-if="
        regions.length || (selectedRegion && Object.keys(selectedRegion).length)
      "
      v-model="internalRegion"
      :label="$t('form.contactRequest.region')"
      :options="regions"
      :option-label="'name'"
      :required="true"
      :disabled="disabled"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
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
    disabled: {
      type: Boolean,
      default: false,
    },
    selectedCountry: {
      type: Object,
      default: undefined,
    },
    selectedRegion: {
      type: Object,
      default: undefined,
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
  setup(props, { emit }) {
    const internalCountry = computed({
      get: () => props.selectedCountry,
      set: (newVal) => {
        emit('update', {
          country: newVal,
          region: internalRegion.value,
        })
      },
    })

    const internalRegion = computed({
      get: () => props.selectedRegion,
      set: (newVal) => {
        emit('update', {
          country: internalCountry.value,
          region: newVal,
        })
      },
    })

    const countriesStore = useCountriesStore()
    const isoCode = computed(() => internalCountry.value?.isocode)
    const regions = ref([])
    const countries = toRef(countriesStore, 'countries')

    watch(isoCode, async (newIsoCode) => {
      await countriesStore.loadRegions(newIsoCode)
      regions.value = countriesStore.regions[newIsoCode] || []
      emit('update', {
        country: internalCountry.value,
        region: null,
      })
    })

    return {
      helpers,
      required,
      internalCountry,
      internalRegion,
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
