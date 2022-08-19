<template>
  <div class="create-account">
    <h2>
      {{ $t('registration.registrationRequest.title') }}
    </h2>

    <PvInput
      :label="$t('registration.registrationRequest.company')"
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
        requestData.registration.company = $event
        $emit('update', requestData)
      "
    />

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
        requestData.registration.address.country = $event
        loadRegions()
        $emit('update', requestData)
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
        requestData.registration.address.region = $event
        $emit('update', requestData)
      "
    />

    <PvInput
      :label="$t('registration.registrationRequest.firstname')"
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
        requestData.registration.firstName = $event
        $emit('update', requestData)
      "
    />

    <PvInput
      :label="$t('registration.registrationRequest.surname')"
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
        requestData.registration.lastName = $event
        $emit('update', requestData)
      "
    />

    <PvInput
      :label="$t('registration.registrationRequest.mail')"
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
        requestData.registration.email = $event
        $emit('update', requestData)
      "
    />

    <Password
      :label="$t('registration.registrationRequest.password')"
      placeholder="Placeholder"
      :required="true"
      :rules="{
        required: helpers.withMessage(
          $t('form.validationErrorMessages.required'),
          required
        ),
      }"
      :show-validation-criterias="true"
      @update="
        requestData.registration.password = $event
        $emit('update', requestData)
      "
    />
  </div>
</template>

<script>
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import Password from '~/components/atoms/FormComponents/Password/Password'
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { required, email, helpers } from '@vuelidate/validators'
import { useRegions } from '~/composables/useRegions'
import { useMiscStore } from '~/stores/misc'

export default defineComponent({
  name: 'CreateAccount',
  components: { PvInput, PvSelect, Password },
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
    const requestData = ref({
      registration: {
        company: '',
        address: {
          country: {},
          region: {},
        },
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    })

    const countriesStore = useMiscStore()
    const countries = computed(() => countriesStore.countries)

    const { loadRegions, regions } = useRegions(
      computed(() => requestData.value.registration?.address?.country?.isocode)
    )

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
.create-account {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;
}
</style>
