<template>
  <PvInput
    v-model="searchTerm"
    icon="search"
    :placeholder="$t('form.input.search.placeholder')"
    :autofocused="true"
    @submit="pushSearchTerm"
    @click:icon="pushSearchTerm"
    @input="loadSuggestions"
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
import { useCategoryStore } from '~/stores/category/category'

export default defineComponent({
  components: {
    PvInput,
  },
  emits: ['submit'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const { app } = useContext()
    const categoryStore = useCategoryStore()

    const { loadSuggestions, blurSuggestions } = categoryStore

    const searchTerm = ref(route.value.query.searchTerm || '')

    const pushSearchTerm = (e) => {
      emit('submit')
      router.push({
        path: app.localePath('shop-categories'),
        query: { searchTerm: e.length ? e : undefined },
      })
    }
    return { pushSearchTerm, searchTerm, loadSuggestions, blurSuggestions }
  },
})
</script>
