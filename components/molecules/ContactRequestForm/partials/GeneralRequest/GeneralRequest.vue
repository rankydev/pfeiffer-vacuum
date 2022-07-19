<template>
  <div class="general-request">
    <PvInput
      v-model="formData.firstname"
      :label="$t('form.contactRequest.firstname')"
      placeholder="Placeholder"
      :required="true"
      type="firstname"
    />
    {{ formData.firstname }}
    <pre>{{ v$ }}</pre>

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
    <button @click="submitForm">Click me</button>
  </div>
</template>
<script>
import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import PvTextArea from '~/components/atoms/FormComponents/PvTextArea/PvTextArea'
import { defineComponent, reactive } from '@nuxtjs/composition-api'
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
      firstname: 'Test',
    })

    const fn = reactive(formData.firstname)

    const v$ = useVuelidate(rules, formData)

    const submitForm = async () => {
      const result = await v$.value.$validate()
      if (result) {
        console.log('yay')
      }
    }

    return {
      formData,
      rules,
      submitForm,
      v$,
      fn,
    }
  },
  // data() {
  //   return {
  //     firstname: '',
  //   }
  // },
  // validations() {
  //   return {
  //     firstname: { required },
  //     // formData: {
  //     //   firstname: { required }, // Matches this.firstname
  //     // },
  //   }
  // },
})
</script>
<style lang="scss">
.general-request {
  @apply tw-flex tw-flex-col;
  @apply tw-gap-4;
}
</style>
