<template>
  <GeneralRequest />
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
    },
  },
})
</script>

<style lang="scss"></style>
