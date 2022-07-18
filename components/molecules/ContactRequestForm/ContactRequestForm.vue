<template>
  <div>
    <div>
      {{ type }}
    </div>
    <GeneralRequest v-if="type === 'general_request'" />
    <TopicRequest v-else />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import GeneralRequest from '~/components/molecules/ContactRequestForm/partials/GeneralRequest/GeneralRequest'

export default defineComponent({
  components: {
    GeneralRequest,
  },
  props: {
    /**
     * The image
     */
    type: {
      type: String,
      required: true,
      default: 'general_request',
    },
  },
})
</script>

<style lang="scss"></style>
