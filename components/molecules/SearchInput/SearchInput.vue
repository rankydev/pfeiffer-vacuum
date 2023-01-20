<template>
  <PvInput
    ref="pvInput"
    v-model="searchTerm"
    icon="search"
    :placeholder="$t('form.input.search.placeholder')"
    @submit="pushSearchTerm"
    @click:icon="pushSearchTerm"
    @input="loadSuggestions"
    @focus="emitFocus"
  />
</template>

<script>
import {
  defineComponent,
  useRouter,
  useRoute,
  useContext,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'

import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'
import { useCategoryStore } from '~/stores/category/category'

export default defineComponent({
  components: {
    PvInput,
  },
  emits: ['submit', 'focus'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const { app } = useContext()
    const categoryStore = useCategoryStore()

    const pvInput = ref(null)

    const { loadSuggestions, blurSuggestions } = categoryStore

    const searchTerm = ref(route.value.query.searchTerm || '')

    const pushSearchTerm = (e) => {
      emit('submit')
      router.push({
        path: app.localePath('shop-categories'),
        query: { searchTerm: e.length ? e : undefined },
      })
    }

    const emitFocus = (val) => {
      emit('focus', val)
    }

    onMounted(() => {
      pvInput.value.$refs.input.focus()
    })

    return {
      pushSearchTerm,
      searchTerm,
      loadSuggestions,
      blurSuggestions,
      pvInput,
      emitFocus,
    }
  },
})
</script>
