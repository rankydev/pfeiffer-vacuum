<template>
  <div class="contact-request-form">
    <LoadingSpinner :show="loading">
      <GeneralRequest
        v-if="contactRequestType === 'GENERAL_QUERY'"
        :validate="validate"
        :type="contactRequestType"
        @update="requestData = $event"
      />
      <TopicRequest
        v-else
        :validate="validate"
        :type="contactRequestType"
        @update="requestData = $event"
      />
      <Button
        :label="$t('form.contactRequest.submit')"
        variant="secondary"
        shape="filled"
        size="normal"
        icon="send"
        class="contact-request-form__button"
      />
    </LoadingSpinner>
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/TopicRequest/TopicRequest'
import Button from '~/components/atoms/Button/Button.vue'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import useVuelidate from '@vuelidate/core'
import { useToast } from '~/composables/useToast'
import { useContactStore } from '~/stores/contact'

export default defineComponent({
  components: {
    LoadingSpinner,
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
  emits: ['close'],
  setup(_, { emit }) {
    const loading = ref(false)
    const { i18n } = useContext()
    const contactStore = useContactStore()
    const toast = useToast()
    // this will collect all nested component’s validation results
    const v = useVuelidate()
    const requestData = ref({})

    let validate = ref(false)

    const submit = async () => {
      validate.value = true
      if (v.value.$errors.length + v.value.$silentErrors.length === 0) {
        loading.value = true
        await contactStore
          .submitContact(requestData.value)
          .then(() => {
            loading.value = false
            emit('close')
            toast.success(
              {
                description: i18n.t('form.message.success'),
              },
              {
                timeout: 8000,
              }
            )
          })
          .catch(() => {
            loading.value = false
            toast.error({
              description: i18n.t('form.message.error'),
            })
          })
      }
    }

    return { v, validate, submit, requestData, loading }
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
