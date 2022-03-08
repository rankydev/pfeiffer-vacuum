<template>
  <InputField icon="search" placeholder="Suche ..." />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import InputField from '~/components/atoms/InputField/InputField.vue'

export default defineComponent({
  components: {
    InputField,
  },
})
</script>
