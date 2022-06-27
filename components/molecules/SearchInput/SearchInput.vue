<template>
  <InputField
    icon="search"
    :placeholder="$t('form.input.search.placeholder')"
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import InputField from '~/components/atoms/FormComponents/InputField/InputField.vue'

export default defineComponent({
  components: {
    InputField,
  },
})
</script>
