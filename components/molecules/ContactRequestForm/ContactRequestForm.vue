<template>
  <div class="contact-request-form">
    <GeneralRequest
      v-if="contactRequestType === 'GENERAL_QUERY'"
      :validate="validate"
      :type="contactRequestType"
      :countries="countries"
      @update="requestData = $event"
    />
    <TopicRequest
      v-else
      :validate="validate"
      :type="contactRequestType"
      :countries="countries"
      @update="requestData = $event"
    />
    <Button
      :label="$t('form.contactRequest.submit')"
      variant="secondary"
      shape="filled"
      size="normal"
      icon="send"
      class="contact-request-form__button"
      @click.native="submit()"
    />
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/TopicRequest/TopicRequest'
import Button from '~/components/atoms/Button/Button.vue'
import useVuelidate from '@vuelidate/core'
import { useMiscStore } from '~/stores/misc'

export default defineComponent({
  components: {
    GeneralRequest,
    TopicRequest,
    Button,
  },
  props: {
    /**
     * defines which input fields are included in the form. There are two types: GeneralRequest and TopicRequest
     */
    contactRequestType: {
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
  setup() {
    const { $hybrisApi } = useContext()
    // this will collect all nested component’s validation results
    const v = useVuelidate()
    const requestData = ref({})

    let validate = ref(false)

    const { countries } = useMiscStore()

    const submit = async () => {
      validate.value = true
      if (v.value.$errors.length + v.value.$silentErrors.length === 0) {
        await $hybrisApi.contactApi
          .submitContact(requestData.value)
          .then(() => {
            // TODO: Implement Toast
            alert('Contact request successfully sent!')
          })
          .catch((e) => {
            // TODO: Implement Toast
            alert(e)
          })
      }
    }

    return { v, validate, submit, requestData, countries }
  },
})
</script>

<style lang="scss">
.contact-request-form {
  &__button {
    @apply tw-mt-6;
  }
}
</style>
