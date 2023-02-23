<template>
  <div class="document-search-result tw-grid-container">
    <div class="document-search-result__sidebar">
      <div
        class="tw-flex tw-bg-pv-grey-88 tw-rounded-md tw-items-center tw-justify-center tw-font-bold tw-text-pv-white tw-text-2xl tw-text-center tw-mb-5"
        style="height: 200px"
      >
        <div>[Advanced Search] PVWEB-546</div>
      </div>
    </div>
    <div class="document-search-result__documents">
      <client-only>
        <LoadingSpinner :show="searchResultsLoading">
          <div v-if="totalResults" class="document-search-result__total-count">
            {{ $t('category.resultsFound', { totalResults }) }}
          </div>
          <DocumentSearchFilters class="document-search-result__filters" />
          <transition-group
            v-if="searchResultsItems.length"
            name="fade-in-out"
            class="document-search-result__list"
            tag="div"
          >
            <DocumentSearchItem
              v-for="item in searchResultsItems"
              :key="item.id"
              :product="item"
              class="fade-in-out-item"
            />
          </transition-group>
          <GlobalMessage
            v-else-if="!searchResultsLoading && !searchResultsLoadingError"
            :description="$t('category.documents.noResultsFound')"
            variant="warning"
            :prevent-icon-change="true"
          />
          <GlobalMessage
            v-else-if="!searchResultsLoading && searchResultsLoadingError"
            :description="$t('category.documents.loadingError')"
            variant="error"
            :prevent-icon-change="true"
          />
          <div
            v-if="searchResultsItems.length"
            class="document-search-result__pages"
          >
            <CategoryPageSizeSelection
              :active="pageSize"
              @change="updatePageSize"
            />
            <Pagination
              class="document-search-result__pagination"
              :total-pages="totalPages"
            />
          </div>
        </LoadingSpinner>
      </client-only>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  useRouter,
  useRoute,
} from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import { useEmpolisStore } from '~/stores/empolis'
import { PAGE_SIZE_DEFAULT } from '~/config/pagination.config'

import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import DocumentSearchItem from '~/components/molecules/DocumentSearchItem/DocumentSearchItem.vue'
import DocumentSearchFilters from '~/components/organisms/DocumentSearchFilters/DocumentSearchFilters.vue'
import CategoryPageSizeSelection from '~/components/molecules/CategoryPageSizeSelection/CategoryPageSizeSelection.vue'
import Pagination from '~/components/molecules/Pagination/Pagination.vue'
import GlobalMessage from '~/components/organisms/GlobalMessage/GlobalMessage'

export default defineComponent({
  name: 'DocumentSearchResult',
  components: {
    LoadingSpinner,
    DocumentSearchItem,
    DocumentSearchFilters,
    CategoryPageSizeSelection,
    Pagination,
    GlobalMessage,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const empolisStore = useEmpolisStore()

    const pageSize = computed(() =>
      Number(route.value.query?.pageSize || PAGE_SIZE_DEFAULT)
    )

    const { searchResults, searchResultsLoading, searchResultsLoadingError } =
      storeToRefs(empolisStore)

    const searchResultsItems = computed(() => {
      return searchResults.value?.results || []
    })

    const totalResults = computed(() => {
      return searchResults.value?.totalCount || 0
    })

    const totalPages = computed(() => {
      if (totalResults.value === 0) {
        return 0
      }
      return Math.ceil(totalResults.value / pageSize.value)
    })

    const updatePageSize = (e) => {
      router.push({
        query: {
          ...route.value.query,
          pageSize: e,
          currentPage: 1,
        },
      })
    }

    return {
      updatePageSize,
      pageSize,
      totalResults,
      totalPages,
      searchResultsItems,
      searchResultsLoading,
      searchResultsLoadingError,
    }
  },
})
</script>

<style lang="scss">
@import '/assets/scss/mixins';

.document-search-result {
  @apply tw-bg-pv-grey-96;
  @apply tw-pt-4;
  @apply tw-pb-6;

  @screen lg {
    @apply tw-pt-10;
    @apply tw-pb-12;
  }

  &__sidebar {
    @apply tw-col-start-1;
    @apply tw-col-span-6;

    @screen md {
      @apply tw-col-start-1;
      @apply tw-col-span-8;
    }

    @screen lg {
      @apply tw-col-start-1;
      @apply tw-col-span-3;
    }
  }

  &__documents {
    @apply tw-col-start-1;
    @apply tw-col-span-6;

    @screen md {
      @apply tw-col-start-1;
      @apply tw-col-span-8;
    }

    @screen lg {
      @apply tw-col-start-4;
      @apply tw-col-span-9;
    }
  }

  &__filters {
    @apply tw-mb-4;
  }

  &__list {
    @include box-shadow;
  }

  &__total-count {
    @apply tw-text-pv-grey-48;
    @apply tw-text-xs;
    @apply tw-mb-4;
  }

  &__pages {
    @apply tw-flex;
    @apply tw-flex-col-reverse;
    @apply tw-items-center;
    @apply tw-mt-4;

    @screen md {
      @apply tw-flex-row;
      @apply tw-justify-between;
    }
  }

  &__pagination {
    @apply tw-my-2;

    @screen md {
      @apply tw-my-0;
    }
  }
}
</style>