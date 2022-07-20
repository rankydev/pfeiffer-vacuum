<template>
  <div class="contact-request-form">
    <!-- Find out what forms to render for selection options -->
    <GeneralRequest v-if="contactRequestType === 'GENERAL_QUERY'" />
    <TopicRequest v-else />
    <Button
      label="Anfrage absenden"
      variant="secondary"
      shape="filled"
      size="normal"
      icon="send"
      class="contact-request-form__button"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'
import TopicRequest from '~/components/molecules/ContactRequestForm/partials/TopicRequest/TopicRequest'
import Button from '~/components/atoms/Button/Button.vue'

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
      // default: 'QUOTE',
    },
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
