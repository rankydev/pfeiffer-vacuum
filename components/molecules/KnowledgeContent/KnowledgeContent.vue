<template>
  <div class="knowledge-content">
    <KnowledgeNav v-if="isOverviewPage" />
    <ResultHeadline
      id="knowledge-results"
      class="knowledge-content__headline"
      :headline="resultHeadline"
      :result-count="totalResults"
      :link="backLink"
    />
    <ContentWrapper breakout>
      <div class="knowledge-content__results">
        <ContentWrapper>
          <ProductCardGrid :use-knowledge-card="true" :products="documents" />
          <CategoryPageSizeSelection
            :active="activePageSize"
            :knowledge-mode="true"
            @change="handlePageSizeChange"
          />
          <Pagination :total-pages="totalPages" />
        </ContentWrapper>
      </div>
    </ContentWrapper>
  </div>
</template>
<script>
import {
  computed,
  useRoute,
  useRouter,
  useContext,
  onBeforeMount,
  onServerPrefetch,
  watch,
} from '@nuxtjs/composition-api'
import { useKnowledgeStore } from '~/stores/knowledge'
import KnowledgeNav from '~/components/molecules/KnowledgeNav/KnowledgeNav'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import ProductCardGrid from '~/components/organisms/ProductCardGrid/ProductCardGrid'
import Pagination from '~/components/molecules/Pagination/Pagination'
import CategoryPageSizeSelection from '~/components/molecules/CategoryPageSizeSelection/CategoryPageSizeSelection'
import { storeToRefs } from 'pinia'

export default {
  name: 'KnowledgeContent',
  components: {
    KnowledgeNav,
    ResultHeadline,
    ContentWrapper,
    ProductCardGrid,
    Pagination,
    CategoryPageSizeSelection,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { localePath, i18n } = useContext()
    const knowledgeStore = useKnowledgeStore()
    const { knowledgeSearch } = knowledgeStore
    const { searchResults } = storeToRefs(knowledgeStore)

    /**
     * Knowledge search result entries
     */
    const documents = computed(
      () => searchResults.value?.knowledgeDocuments || []
    )

    /**
     * Page type check
     */
    const isOverviewPage = computed(
      () => !isWhitepapers.value && !isWebinars.value
    )
    const isWhitepapers = computed(() =>
      route.value.path.includes('whitepapers')
    )
    const isWebinars = computed(() => route.value.path.includes('webinars'))

    /**
     * Headline parameters
     */
    const resultHeadline = computed(() => {
      if (isWhitepapers.value) return i18n.t('knowledge.whitepapers')
      if (isWebinars.value) return i18n.t('knowledge.webinars')
      return i18n.t('knowledge.allRessources')
    })
    const backLink = computed(() =>
      !isOverviewPage.value ? localePath('knowledge') : null
    )

    /**
     * Page handling
     */
    const activePageSize = computed(() =>
      Number(route.value.query?.pageSize || 12)
    )
    const totalPages = computed(
      () => searchResults.value?.pagination?.totalPageCount || 1
    )
    const totalResults = computed(
      () => searchResults.value?.pagination?.totalCount || 0
    )
    const handlePageSizeChange = (e) => {
      const { hash, params, path, query } = route.value
      router.push({
        hash,
        params,
        path,
        query: { ...query, currentPage: 1, pageSize: e },
      })
    }

    onBeforeMount(knowledgeSearch)
    onServerPrefetch(knowledgeSearch)
    watch(route, () => {
      knowledgeSearch()
    })

    return {
      documents,
      searchResults,
      isOverviewPage,
      resultHeadline,
      backLink,
      totalPages,
      totalResults,
      activePageSize,

      handlePageSizeChange,
    }
  },
}
</script>
<style lang="scss">
.knowledge-content {
  &__headline {
    @apply tw-mt-12;
  }

  &__results {
    @apply tw-bg-pv-grey-96;
  }
}
</style>
