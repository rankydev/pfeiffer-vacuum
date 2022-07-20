<template>
  <div class="general-request">
    <PvInput
      :label="$t('form.contactRequest.firstname')"
      placeholder="Placeholder"
      :required="true"
      :has-error="!!getError('firstname')"
      :error-message="getError('firstname')"
      @update="
        formData.firstname = $event
        validateInput()
      "
    />

    {{ formData.firstname }}
    <pre>{{ v$.$errors }}</pre>

    <PvInput
      :label="$t('form.contactRequest.surname')"
      placeholder="Placeholder"
      :required="true"
    />
    <PvInput
      :label="$t('form.contactRequest.mail')"
      placeholder="Placeholder"
      :required="true"
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
    <PvTextArea
      :label="$t('form.contactRequest.message')"
      placeholder="Placeholder"
      :required="false"
    />
  </div>
</template>
<script>
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'
import { defineComponent, reactive, computed } from '@nuxtjs/composition-api'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default defineComponent({
  name: 'GeneralRequest',
  components: { PvTextArea, PvInput, PvSelect },

  setup() {
    const rules = {
      firstname: {
        required,
      },
    }

    const formData = reactive({
      firstname: '',
    })

    const v$ = useVuelidate(rules, formData)

    const validateInput = async () => {
      const result = await v$.value.$validate()
    }

    const getError = computed(() => {
      return (field) => {
        const error = v$.value.$errors?.find((i) => i.$property === field)
        const errorMsg = error?.$message
        return error ? errorMsg : null
      }
    })

    return {
      formData,
      rules,
      v$,
      validateInput,
      getError,
    }
  },
})
</script>
<style lang="scss">
.general-request {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;
}
</style>
