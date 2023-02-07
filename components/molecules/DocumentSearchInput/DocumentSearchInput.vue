<template>
  <div class="document-search-input">
    <PvInput
      ref="pvInput"
      v-model="searchTermDocument"
      icon="search"
      :placeholder="$t('form.input.search.placeholder')"
      @input="getResults"
    />

    <!-- <GenericModal
      class="search-header__modal"
      :is-open="true"
      :fill-viewport="true"
    >
      <div class="search-header__modal-content">
        <h2 class="search-header__headline">
          {{ $t('category.search') }}
        </h2>
        <SearchInput @submit="closeSearchfield" />
        <div
          v-if="currentSuggestions.length"
          class="search-header__suggestions"
        >
          <h4 class="search-header__suggestions--headline">
            {{ `${$t('category.suggestions')}:` }}
          </h4>
          <SearchButton
            v-for="item in currentSuggestions"
            :key="item.value"
            class="search-header__suggestions--result"
            :title="item.value"
          />
        </div>
      </div>
    </GenericModal> -->
    <!-- <div v-if="currentSuggestions.length" class="suggestions"> -->
    <div class="suggestions">
      <SearchButton
        v-for="item in currentSuggestions"
        :key="item.value"
        class="asdf"
        :title="item.value"
      />
      <!-- </div> -->
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
import SearchHeader from '~/components/organisms/Header/partials/SearchHeader/SearchHeader.vue'
import GenericModal from '~/components/molecules/GenericModal/GenericModal'
import SearchButton from '~/components/molecules/SearchButton/SearchButton'
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

    const searchTermDocument = ref(route.value.query.searchTerm || '')
    const activeTab = computed(() => route.value.query.searchType)
    const { getSearchSuggestions } = useEmpolis()
    const currentSuggestions = ref([])
    const suggestionHover = ref(false)

    const blurSuggestions = (val) => {
      if (!val) searchSuggestions.value = []
    }

    const closeSearchfield = () => {
      blurSuggestions(false)
      isOpen.value = false
    }

    const getResults = async () => {
      const results = await getSearchSuggestions(searchTermDocument.value, 3)

      console.log('results: ', results)
      currentSuggestions.value = results

      return results
    }
    // watch(
    //   activeTab,
    //   (activeTabValue) => {
    //     console.log(activeTabValue)
    //   },
    //   { immediate: true }
    // )

    // watch(activeTab, () => {
    //   console.log(activeTab.value)
    //   if (activeTab?.value === 'documents') {
    //     pushSearchTerm(searchTermDocument)
    //   }
    // })

    const pushSearchTerm = (e) => {
      emit('submit')
      router.push({
        path: app.localePath('shop-categories'),
        query: { searchTerm: e.length ? e : undefined },
      })
    }
    console.log('activeTab', activeTab)

    const emitFocus = (val) => {
      emit('focus', val)
    }

    return {
      pvInput,
      emitFocus,
      searchTermDocument,
      getResults,
      closeSearchfield,
      currentSuggestions,
      suggestionHover,
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
