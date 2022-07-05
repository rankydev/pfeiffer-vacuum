<template>
  <PvInput icon="search" :placeholder="$t('form.input.search.placeholder')" />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'

export default defineComponent({
  components: {
    PvInput,
  },
})
</script>
