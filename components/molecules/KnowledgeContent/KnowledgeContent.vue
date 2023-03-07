<template>
  <div class="knowledge-content">
    <KnowledgeNav v-if="isOverviewPage" />
    <ResultHeadline
      id="knowledge-results"
      class="knowledge-content__headline"
      :headline="resultHeadline"
      :result-count="245"
      :link="backLink"
    />
    <ContentWrapper breakout>
      <div class="knowledge-content__results">
        <ContentWrapper>
          <ProductCardGrid
            :use-knowledge-card="true"
            :products="mockedSearchResults"
          />
        </ContentWrapper>
      </div>
    </ContentWrapper>
  </div>
</template>
<script>
import {
  computed,
  useRoute,
  useContext,
  onBeforeMount,
  onServerPrefetch,
} from '@nuxtjs/composition-api'
import { useKnowledgeStore } from '~/stores/knowledge'
import KnowledgeNav from '~/components/molecules/KnowledgeNav/KnowledgeNav'
import ResultHeadline from '~/components/molecules/ResultHeadline/ResultHeadline'
import ContentWrapper from '~/components/molecules/ContentWrapper/ContentWrapper'
import ProductCardGrid from '~/components/organisms/ProductCardGrid/ProductCardGrid'
import { storeToRefs } from 'pinia'

export default {
  name: 'KnowledgeContent',
  components: {
    KnowledgeNav,
    ResultHeadline,
    ContentWrapper,
    ProductCardGrid,
  },
  setup() {
    const route = useRoute()
    const { localePath, i18n } = useContext()
    const knowledgeStore = useKnowledgeStore()
    const { knowledgeSearch } = knowledgeStore
    const { searchResults } = storeToRefs(knowledgeStore)

    const mockedSearchResults = computed(() => {
      if (searchResults.value?.knowledgeDocuments) {
        return [
          ...searchResults.value.knowledgeDocuments,
          ...searchResults.value.knowledgeDocuments,
          ...searchResults.value.knowledgeDocuments,
        ]
      } else {
        return []
      }
    })

    const isWhitepapers = computed(() =>
      route.value.path.includes('whitepapers')
    )

    const isWebinars = computed(() => route.value.path.includes('webinars'))

    const isOverviewPage = computed(
      () => !isWhitepapers.value && !isWebinars.value
    )

    const resultHeadline = computed(() => {
      if (isWhitepapers.value) return i18n.t('knowledge.whitepapers')
      if (isWebinars.value) return i18n.t('knowledge.webinars')
      return i18n.t('knowledge.allRessources')
    })

    const backLink = computed(() =>
      !isOverviewPage.value ? localePath('knowledge') : null
    )

    onBeforeMount(knowledgeSearch)
    onServerPrefetch(knowledgeSearch)

    return {
      mockedSearchResults,

      isOverviewPage,
      resultHeadline,
      backLink,
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
