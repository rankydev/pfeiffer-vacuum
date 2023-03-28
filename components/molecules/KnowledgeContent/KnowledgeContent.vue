<template>
  <div class="knowledge-content">
    <KnowledgeNav v-if="isOverviewPage" />
    <ResultHeadline
      identifier="knowledge-results"
      class="knowledge-content__headline"
      :headline="resultHeadline"
      :result-count="totalResults"
      :link="backLink"
    />
    <ContentWrapper breakout>
      <!-- TODO: Maybe find better solution to fix hydration -->
      <client-only>
        <LoadingSpinner :show="isLoading">
          <div class="knowledge-content__results">
            <ContentWrapper>
              <div class="knowledge-content__top-actions">
                <FilterModal :label="$t('knowledge.filter')">
                  <div class="knowledge-content__filters">
                    <PvSelect
                      v-for="filter in filterEntries"
                      :key="filter.code"
                      :value="(filter.values || []).filter((e) => e.selected)"
                      option-label="name"
                      :placeholder="filter.name"
                      :multiple="true"
                      :options="filter.values || []"
                      class="knowledge-content__multiselect"
                      @input="handleFilterInput(filter.code, $event)"
                    />
                  </div>
                </FilterModal>
                <div class="knowledge-content__search-input">
                  <SearchInput
                    :value="searchTerm"
                    :clear-after-submit="false"
                    :placeholder="searchPlaceholder"
                    :disable-suggestions="true"
                    @submit="handleTermChange"
                  />
                </div>
              </div>
              <ProductCardGrid
                :use-knowledge-card="true"
                :products="documents"
              />
              <div class="knowledge-content__bottom-actions">
                <CategoryPageSizeSelection
                  :active="activePageSize"
                  :knowledge-mode="true"
                  class="knowledge-content__bottom-actions--selection"
                  @change="handlePageSizeChange"
                />
                <Pagination
                  :total-pages="totalPages"
                  class="knowledge-content__bottom-actions--pagination"
                />
              </div>
            </ContentWrapper>
          </div>
        </LoadingSpinner>
      </client-only>
    </ContentWrapper>
    <KnowledgeModal :is-open="isModalOpen" @closeModal="toggleModal(false)" />
  </div>
</template>
<script>
import {
  computed,
  useRoute,
  useRouter,
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
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import SearchInput from '~/components/molecules/SearchInput/SearchInput'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import FilterModal from '~/components/molecules/FilterModal/FilterModal'
import KnowledgeModal from '~/components/molecules/KnowledgeModal/KnowledgeModal'
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
    LoadingSpinner,
    SearchInput,
    PvSelect,
    FilterModal,
    KnowledgeModal,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const knowledgeStore = useKnowledgeStore()
    const { knowledgeSearch } = knowledgeStore
    const {
      searchResults,
      isLoading,
      isOverviewPage,
      resultHeadline,
      backLink,
      filterEntries,
      isModalOpen,
      searchPlaceholder,
    } = storeToRefs(knowledgeStore)

    const searchTerm = computed(() => route.value.query.searchTerm || '')

    /**
     * Knowledge search result entries
     */
    const documents = computed(
      () => searchResults.value?.knowledgeDocuments || []
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

    const currentRoute = computed(() => {
      const { hash, params, path } = route.value
      return { hash, params, path }
    })

    const handlePageSizeChange = (e) => {
      const { query } = route.value
      router.push({
        ...currentRoute.value,
        query: { ...query, currentPage: 1, pageSize: e },
      })
    }

    const handleTermChange = (e) => {
      const { query } = route.value
      router.push({
        ...currentRoute.value,
        query: {
          ...query,
          currentPage: 1,
          searchTerm: e.length ? e : undefined,
        },
      })
    }

    const handleFilterInput = (code, val) => {
      const { query } = route.value
      const newQuery = { ...query, currentPage: 1 }
      const selectedValues = []

      val.forEach((item) => selectedValues.push(item.code))

      if (val.length) newQuery[code] = selectedValues.join(',')
      else delete newQuery[code]

      router.push({
        ...currentRoute.value,
        query: newQuery,
      })
    }

    const toggleModal = (state) => (isModalOpen.value = state)

    onBeforeMount(knowledgeSearch)
    onServerPrefetch(knowledgeSearch)
    watch(route, () => {
      knowledgeSearch()
    })

    return {
      // Getters
      documents,
      searchResults,
      isOverviewPage,
      resultHeadline,
      backLink,
      totalPages,
      totalResults,
      activePageSize,
      isLoading,
      filterEntries,
      searchTerm,
      isModalOpen,
      searchPlaceholder,

      // Actions
      handlePageSizeChange,
      handleTermChange,
      handleFilterInput,
      toggleModal,
    }
  },
}
</script>
<style lang="scss">
.knowledge-content {
  &__headline {
    @apply tw-mt-12;

    .result-headline__content {
      @apply tw-flex;
    }
  }

  &__results {
    @apply tw-py-6;
    @apply tw-bg-pv-grey-96;

    @screen md {
      @apply tw-pb-8;
    }

    @screen lg {
      @apply tw-pt-8;
      @apply tw-pb-12;
    }
  }

  &__top-actions {
    @apply tw-flex tw-justify-between;
    @apply tw-flex-col;
    @apply tw-mb-4;
    @apply tw-gap-4;

    @screen md {
      @apply tw-flex-row;
    }
  }

  &__filters {
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-2;

    @screen md {
      @apply tw-flex-row;
    }
  }

  &__search-input {
    @apply tw-w-full;

    @screen md {
      @apply tw-w-64;
    }
  }

  &__bottom-actions {
    @apply tw-mt-4;
    @apply tw-flex;
    @apply tw-flex-col-reverse;
    @apply tw-items-center;

    @screen md {
      @apply tw-flex-row;
      @apply tw-justify-between;
      @apply tw-items-center;
    }

    &--selection {
      @apply tw-mt-4;

      @screen md {
        @apply tw-mt-0;
      }
    }
  }

  &__multiselect {
    @screen md {
      @apply tw-inline-block;

      .vs__dropdown-toggle {
        @apply tw-p-2;
        @apply tw-text-xs;
      }

      &--name {
        input {
          @apply tw-w-0;

          &:focus {
            @apply tw-w-0;
          }
        }

        li {
          @apply tw-whitespace-nowrap;
        }
      }
    }
  }
}
</style>
