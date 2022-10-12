<template>
  <PvInput
    icon="search"
    :placeholder="$t('form.input.search.placeholder')"
    @submit="pushSearchTerm"
    @click:icon="pushSearchTerm"
  />
</template>

<script>
import { defineComponent, useRouter, useRoute } from '@nuxtjs/composition-api'

import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'

export default defineComponent({
  components: {
    PvInput,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const pushSearchTerm = (e) => {
      console.log(e, 'VALUE')
      router.push({
        query: { ...route.value.query, searchTerm: e.length ? e : undefined },
      })
    }
    return { pushSearchTerm }
  },
})
</script>
