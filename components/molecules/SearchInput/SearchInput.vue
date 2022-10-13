<template>
  <PvInput
    v-model="searchTerm"
    icon="search"
    :placeholder="$t('form.input.search.placeholder')"
    @submit="pushSearchTerm"
    @click:icon="pushSearchTerm"
  />
</template>

<script>
import {
  defineComponent,
  useRouter,
  useRoute,
  useContext,
  ref,
} from '@nuxtjs/composition-api'

import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'

export default defineComponent({
  components: {
    PvInput,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { app } = useContext()
    const searchTerm = ref(route.value.query.searchTerm || '')

    const pushSearchTerm = (e) => {
      router.push({
        path: app.localePath('shop-categories'),
        query: { ...route.value.query, searchTerm: e.length ? e : undefined },
      })
    }
    return { pushSearchTerm, searchTerm }
  },
})
</script>
