<template>
  <div class="contact-request-form">
    <!-- Find out what forms to render for selection options -->
    <GeneralRequest
      v-if="contactRequestType === 'GENERAL_QUERY'"
      :validate="validate"
      @update="requestData = $event"
    />
    <TopicRequest v-else :validate="validate" @update="requestData = $event" />
    <Button
      :label="$t('form.contactRequest.submit')"
      variant="secondary"
      shape="filled"
      size="normal"
      icon="send"
      class="contact-request-form__button"
      @click.native="submit()"
    />
    <p v-for="error of v.$errors" :key="error.$uid"></p>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/TopicRequest/TopicRequest'
import Button from '~/components/atoms/Button/Button.vue'
import useVuelidate from '@vuelidate/core'

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
    // this will collect all nested component’s validation results
    const v = useVuelidate()

    let validate = ref(false)
    const submit = () => {
      validate.value = true
      if (v.value.$errors.length === 0) {
        // in diesem Fall kann der request abgeschickt werden, denn das error array ist leer und es gibt keine Form errors mehr
        // ToDo implement send request logic
      }
    }

    const requestData = ref({})

    return { v, validate, submit, requestData }
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