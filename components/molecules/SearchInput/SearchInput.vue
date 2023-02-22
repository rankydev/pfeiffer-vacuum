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
  useContext,
  useRouter,
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
    const categoryStore = useCategoryStore()
    const { loadSuggestions, blurSuggestions } = categoryStore
    const { app } = useContext()
    const isMobile = app.$breakpoints.isMobile

    const pvInput = ref(null)
    const searchTerm = ref('')

    const pushSearchTerm = (e) => {
      emit('submit')
      router.push({
        path: app.localePath('shop-search'),
        query: {
          searchTerm: e.length ? e : undefined,
          initialSearchTerm: e.length ? e : undefined,
          searchType: 'products',
        },
      })
      searchTerm.value = ''
    }

    const emitFocus = (val) => {
      emit('focus', val)
    }

    onMounted(() => {
      if (isMobile) {
        pvInput.value.$refs.input.focus()
      }
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
