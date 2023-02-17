<template>
  <div class="document-search-input">
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
      class="document-search-input__suggestions"
    >
      <SearchSuggestions
        :items="currentSuggestions"
        search-type="documents"
        @suggestionHover="suggestionHover = $event"
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

export default defineComponent({
  components: {
    PvInput,
    SearchSuggestions,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { app } = useContext()
    const empolisStore = useEmpolisStore()
    const { debounce } = useDebounce()
    const isDesktop = app.$breakpoints.isDesktop
    const isFocused = ref(true)

    const { fetchDocumentSuggestions } = empolisStore

    const pvInput = ref(null)
    const currentSuggestions = ref([])
    const searchTermDocuments = ref(route.value.query.searchTerm || '')
    const searchTermProducts = ref(route.value.query.searchTerm || '')
    const searchTermInitial = ref(route.value.query.searchTerm || '')
    const searchTerm = ref(searchTermInitial.value)
    const isOpen = ref(false)
    const suggestionHover = ref(true)

    const activeTab = computed(() => route.value.query.searchType)

    watch(searchTermDocuments, (searchTermDocumentsValue) => {
      if (searchTermDocumentsValue === '') {
        currentSuggestions.value = []
      }
      searchTerm.value = searchTermDocumentsValue
    })

    watch(searchTermProducts, (searchTermProductsValue) => {
      searchTerm.value = searchTermProductsValue
    })

    watch(searchTerm, (searchTermValue) => {
      if (activeTab?.value === 'documents') {
        searchTermDocuments.value = searchTermValue
      }
      if (activeTab?.value === 'products') {
        searchTermProducts.value = searchTermValue
      }
    })

    watch(activeTab, (activeTabValue) => {
      searchTerm.value =
        activeTabValue === 'documents'
          ? searchTermDocuments.value
          : activeTabValue === 'products'
          ? searchTermProducts.value
          : searchTermInitial.value

      if (activeTabValue === 'documents') {
        return pushSearchTerm(searchTermDocuments.value)
      }
      pushSearchTerm(searchTermProducts.value)
    })

    const clearInput = () => {
      if (activeTab?.value === 'documents') {
        return (searchTermDocuments.value = '')
      }
      if (activeTab?.value === 'products') {
        return (searchTermProducts.value = '')
      }

      searchTerm.value = ''
    }

    const pushSearchTerm = (term) => {
      const encodedTerm = encodeURIComponent(term)
      const searchType = activeTab.value ? `&searchType=${activeTab.value}` : ''
      router.push(`search?searchTerm=${encodedTerm}${searchType}`)
    }

    const closeSearchfield = (value) => {
      currentSuggestions.value = []
      searchTermDocuments.value = value
      isOpen.value = false
      pushSearchTerm(value)
    }

    const toggleSuggestionsOnFocus = async (val) => {
      isFocused.value = val
    }

    const getSearchSuggestionsResult = debounce(async () => {
      if (activeTab.value !== 'documents') {
        return
      }

      currentSuggestions.value = await fetchDocumentSuggestions(
        searchTermDocuments.value
      )

      isOpen.value = currentSuggestions.value.length > 0
    })

    return {
      pvInput,
      isDesktop,
      searchTermDocuments,
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
    }
  },
})
</script>
<style lang="scss">
@import '/assets/scss/z-index';

.document-search-input {
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
