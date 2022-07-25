<template>
  <div class="contact-request-form">
    <!-- Find out what forms to render for selection options -->
    <GeneralRequest
      v-if="contactRequestType === 'GENERAL_QUERY'"
      :validate="validate"
    />
    <TopicRequest v-else :validate="validate" />
    <Button
      label="Anfrage absenden"
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
     * The contactRequestType
     */
    contactRequestType: {
      type: String,
      required: true,
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

    return { v, validate, submit }
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
