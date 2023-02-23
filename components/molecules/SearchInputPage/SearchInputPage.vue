<template>
  <div class="search-input-page">
    <PvInput
      ref="pvInput"
      v-model="searchTerm"
      :icon="searchTerm.length ? 'cancel' : ''"
      :placeholder="$t('form.input.search.placeholder')"
      @input="getSearchSuggestionsResult"
      @submit="closeSearchfield"
      @click:icon="clearInput"
      @focus="toggleSuggestionsOnFocus"
    />

    <div
      v-if="currentSuggestions.length && (isFocused || suggestionHover)"
      class="search-input-page__suggestions"
    >
      <SearchSuggestions
        :items="currentSuggestions"
        :search-type="activeTab"
        :object-key="objectKey"
        @suggestionHover="(value) => (suggestionHover = value)"
        @click="closeSearchfield"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useContext,
  useRoute,
  useRouter,
  ref,
  watch,
} from '@nuxtjs/composition-api'

import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'
import { useEmpolisStore } from '~/stores/empolis'
import { useDebounce } from '~/composables/useDebounce'
import SearchSuggestions from '~/components/molecules/SearchSuggestions/SearchSuggestions.vue'
import { useCategoryStore } from '~/stores/category/category'

export default defineComponent({
  components: {
    PvInput,
    SearchSuggestions,
  },
  emits: ['searchTermChange'],
  setup(props, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const empolisStore = useEmpolisStore()
    const isFocused = ref(true)
    const categoryStore = useCategoryStore()
    const { app } = useContext()
    const { debounce } = useDebounce()
    const { fetchDocumentSuggestions } = empolisStore
    const { loadSuggestions } = categoryStore
    const isDesktop = app.$breakpoints.isDesktop

    const pvInput = ref(null)
    const currentSuggestions = ref([])
    const searchTerm = ref(route.value.query.searchTerm || '')
    const isOpen = ref(false)
    const suggestionHover = ref(true)

    const activeTab = computed(() => route.value.query.searchType)
    const objectKey = computed(() =>
      route.value.query.searchType === 'documents' ? 'label' : 'value'
    )

    watch(activeTab, () => {
      currentSuggestions.value = []
    })

    watch(route, (val) => {
      if (val.query.initialSearchTerm) {
        searchTerm.value = val.query.initialSearchTerm
      }
    })

    const clearInput = () => {
      searchTerm.value = ''
      pushSearchTerm(searchTerm.value)
    }

    const pushSearchTerm = (term) => {
      emit('searchTermChange', term)
      const encodedTerm = encodeURIComponent(term)
      const searchType = activeTab.value ? `&searchType=${activeTab.value}` : ''
      router.push(`search?searchTerm=${encodedTerm}${searchType}`)
    }

    const closeSearchfield = (value) => {
      searchTerm.value = value
      currentSuggestions.value = []
      isOpen.value = false
      pushSearchTerm(value)
    }

    const toggleSuggestionsOnFocus = async (val) => {
      isFocused.value = val
    }

    const getSearchSuggestionsResult = debounce(async () => {
      if (searchTerm.value === '') return

      if (activeTab.value === 'documents') {
        currentSuggestions.value = await fetchDocumentSuggestions(
          searchTerm.value
        )
      }

      if (activeTab.value === 'products') {
        currentSuggestions.value = await loadSuggestions(searchTerm.value, true)
      }

      isOpen.value = currentSuggestions.value.length > 0
    })

    return {
      pvInput,
      isDesktop,
      getSearchSuggestionsResult,
      closeSearchfield,
      currentSuggestions,
      activeTab,
      searchTerm,
      isOpen,
      clearInput,
      isFocused,
      toggleSuggestionsOnFocus,
      suggestionHover,
      objectKey,
    }
  },
})
</script>
<style lang="scss">
@import '/assets/scss/z-index';

.search-input-page {
  @apply tw-relative;

  .pv-input__icon {
    @apply tw-text-pv-grey-16;
  }

  &__suggestions {
    @apply tw-absolute;
    @apply tw-border-2 tw-border-pv-grey-80;
    @apply tw-rounded-md;
    @apply tw-bg-pv-white;
    @apply tw-w-full;
    border-top: none;
    z-index: $suggestions-container;
  }
}
</style>
