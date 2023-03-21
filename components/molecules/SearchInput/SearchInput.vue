<template>
  <PvInput
    ref="pvInput"
    v-model="searchTerm"
    icon="search"
    :placeholder="placeholder || $t('form.input.search.placeholder')"
    @submit="pushSearchTerm"
    @click:icon="pushSearchTerm"
    @input="handleInput"
    @focus="emitFocus"
  />
</template>

<script>
import {
  defineComponent,
  useContext,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'
import { useDebounce } from '~/composables/useDebounce'

import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'
import { useCategoryStore } from '~/stores/category/category'

export default defineComponent({
  name: 'SearchInput',
  components: {
    PvInput,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    clearAfterSubmit: {
      type: Boolean,
      default: true,
    },
    disableSuggestions: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
  },
  emits: ['submit', 'focus'],
  setup(props, { emit }) {
    const categoryStore = useCategoryStore()
    const { loadSuggestions } = categoryStore
    const { app } = useContext()
    const isMobile = ref(app.$breakpoints.isMobile)

    const pvInput = ref(null)
    const searchTerm = ref(props.value)

    const pushSearchTerm = (e) => {
      emit('submit', e)
      if (props.clearAfterSubmit) searchTerm.value = ''
    }

    const emitFocus = (val) => {
      emit('focus', val)
    }

    const handleInput = (text) => {
      if (!props.disableSuggestions) loadSearchSuggestions(text)
    }

    const { debounce } = useDebounce()
    const loadSearchSuggestions = debounce((text) => {
      loadSuggestions(text)
    })

    onMounted(() => {
      if (isMobile.value) {
        pvInput.value.$refs.input.focus()
      }
    })

    return {
      pushSearchTerm,
      searchTerm,
      pvInput,

      emitFocus,
      handleInput,
    }
  },
})
</script>
