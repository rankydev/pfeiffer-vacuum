<template>
  <div class="document-search-input">
    <PvInput
      ref="pvInput"
      v-model="searchTerm"
      icon="search"
      :placeholder="$t('form.input.search.placeholder')"
      @input="getSearchSuggestionsResult"
      @submit="closeSearchfield"
    />

    <div v-if="isOpen" class="suggestions">
      <SearchButton
        v-for="item in currentSuggestions"
        :key="item.value"
        class="asdf"
        :title="item.value"
        @closeModal="closeSearchfield(item.value)"
        :search-type="activeTab"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  useRouter,
  useRoute,
  useContext,
  ref,
  watch,
} from '@nuxtjs/composition-api'

import PvInput from '~/components/atoms/FormComponents/PvInput/PvInput.vue'
import { useEmpolis } from '~/composables/useEmpolis'
import SearchButton from '~/components/molecules/SearchButton/SearchButton'
import { useCategoryStore } from '~/stores/category/category'
// import _, { debounce } from 'lodash'

export default defineComponent({
  components: {
    PvInput,
    SearchButton,
  },
  emits: ['submit', 'focus'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const { app } = useContext()

    const pvInput = ref(null)

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

    const setSearchTerm = (term) => {
      console.log('termmmm', term)
      pushSearchTerm(term)
      isOpen.value = false
    }

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

    const { getSearchSuggestions } = useEmpolis()
    const currentSuggestions = ref([])
    const suggestionHover = ref(false)

    const blurSuggestions = (val) => {
      if (!val) searchSuggestions.value = []
    }

    // const updateSearchTerm(value) => {

    // }

    const clearCurrentSuggestions = () => {
      currentSuggestions.value = []
      searchTermDocuments.value = value
    }

    const closeSearchfield = (value) => {
      currentSuggestions.value = []
      searchTermDocuments.value = value
      isOpen.value = false

      pushSearchTerm(value)
    }

    const getSearchSuggestionsResult = async () => {
      if (activeTab.value !== 'documents') {
        return
      }

      const results = await getSearchSuggestions(searchTermDocuments.value, 3)
      console.log(results)
      currentSuggestions.value = results
      isOpen.value = currentSuggestions.value.length > 0
    }

    const pushSearchTerm = (term) => {
      const searchTerm = activeTab.value ? `&searchType=${activeTab.value}` : ''
      router.push(`search?searchTerm=${term}${searchTerm}`)
    }

    const emitFocus = (val) => {
      emit('focus', val)
    }

    const test = (value) => {
      console.log(value)
      closeSearchfield()
    }

    return {
      pvInput,
      emitFocus,
      searchTermDocuments,
      getSearchSuggestionsResult,
      closeSearchfield,
      currentSuggestions,
      suggestionHover,
      test,
      blurSuggestions,
      activeTab,
      searchTerm,
      setSearchTerm,
      isOpen,
    }
  },
})
</script>
<style lang="scss">
.document-search-input {
  position: relative;
}

.suggestions {
  @apply tw-absolute;
  @apply tw-border-2 tw-border-pv-grey-80;
  @apply tw-rounded-md;
  @apply tw-bg-pv-white;
  @apply tw-w-full;
  border-top: none;
}
</style>
