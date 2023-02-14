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
    />

    <div
      v-if="isOpen && currentSuggestions.length && searchTerm.length"
      class="document-search-input__suggestions"
    >
      <SearchButton
        v-for="item in currentSuggestions"
        :key="item.value"
        class="search-header__suggestions--result"
        :title="item.value"
        :search-type="activeTab"
        @closeModal="closeSearchfield(item.value)"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useContext,
  useRouter,
  useRoute,
  ref,
  watch,
} from '@nuxtjs/composition-api'

import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'
import { useEmpolis } from '~/composables/useEmpolis'
import { useDebounce } from '~/composables/useDebounce'
import SearchButton from '~/components/molecules/SearchButton/SearchButton'

export default defineComponent({
  components: {
    PvInput,
    SearchButton,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { app } = useContext()
    const { getSearchSuggestions } = useEmpolis()
    const { debounce } = useDebounce()
    const isDesktop = app.$breakpoints.isDesktop

    const pvInput = ref(null)
    const currentSuggestions = ref([])
    const searchTermDocuments = ref(route.value.query.searchTerm || '')
    const searchTermProducts = ref(route.value.query.searchTerm || '')
    const searchTermInitial = ref(route.value.query.searchTerm || '')
    const searchTerm = ref(searchTermInitial.value)
    const isOpen = ref(false)

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
    })

    const setSearchTerm = (term) => {
      console.log('termmmm', term)
      pushSearchTerm(term)
      isOpen.value = false
    }

    const clearInput = () => {
      if (activeTab?.value === 'documents') {
        return (searchTermDocuments.value = '')
      }
      if (activeTab?.value === 'products') {
        return (searchTermProducts.value = '')
      }

      searchTerm.value = ''
    }

    const closeSearchfield = (value) => {
      currentSuggestions.value = []
      searchTermDocuments.value = value
      isOpen.value = false

      pushSearchTerm(value)
    }

    const getSearchSuggestionsResult = debounce(async () => {
      if (activeTab.value !== 'documents') {
        return
      }

      const results = await getSearchSuggestions(searchTermDocuments.value, 3)
      currentSuggestions.value = results
      isOpen.value = currentSuggestions.value.length > 0
    })

    const pushSearchTerm = (term) => {
      const searchType = activeTab.value ? `&searchType=${activeTab.value}` : ''
      router.push(`search?searchTerm=${term}${searchType}`)
    }

    return {
      pvInput,
      isDesktop,
      searchTermDocuments,
      getSearchSuggestionsResult,
      closeSearchfield,
      currentSuggestions,
      activeTab,
      searchTerm,
      setSearchTerm,
      isOpen,
      clearInput,
    }
  },
})
</script>
<style lang="scss">
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
  }
}
</style>
