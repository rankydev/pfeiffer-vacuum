<template>
  <div
    v-if="!searchResultsLoadingError"
    class="document-search-result tw-grid-container"
  >
    <div class="document-search-result__sidebar">
      <div class="advanced-search__info">
        <div class="advanced-search__headline">
          {{ $t('category.documents.advancedSearch') }}
        </div>
        <div class="advanced-search__text">
          {{ $t('category.documents.advancedSearchInfo') }}
        </div>
      </div>
      <Link
        :href="empolisSearchUrl"
        class="advanced-search__link"
        target="_blank"
      >
        <Button
          variant="secondary"
          shape="outlined"
          icon="search"
          :label="$t('category.documents.advancedSearch')"
        />
      </Link>
    </div>
    <div class="document-search-result__documents">
      <!-- TODO: Maybe find better solution to fix hydration -->
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
  <ErrorHandling
    v-else
    :headline="$t('product.errorHandling.noDownloadsAvailable')"
    :grey-background="false"
    class="document-search-result__error-handling"
  />
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
import { useEmpolisHelper } from '~/composables/useEmpolisHelper'

import Button from '~/components/atoms/Button/Button'
import Link from '~/components/atoms/Link/Link'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner.vue'
import ErrorHandling from '~/components/molecules/ErrorHandling/ErrorHandling'
import DocumentSearchItem from '~/components/molecules/DocumentSearchItem/DocumentSearchItem.vue'
import CategoryPageSizeSelection from '~/components/molecules/CategoryPageSizeSelection/CategoryPageSizeSelection.vue'
import Pagination from '~/components/molecules/Pagination/Pagination.vue'
import DocumentSearchFilters from '~/components/organisms/DocumentSearchFilters/DocumentSearchFilters.vue'
import GlobalMessage from '~/components/organisms/GlobalMessage/GlobalMessage'

export default defineComponent({
  name: 'DocumentSearchResult',
  components: {
    ErrorHandling,
    LoadingSpinner,
    DocumentSearchItem,
    DocumentSearchFilters,
    CategoryPageSizeSelection,
    Pagination,
    GlobalMessage,
    Button,
    Link,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const empolisStore = useEmpolisStore()
    const { empolisSearchUrl } = useEmpolisHelper()

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
      empolisSearchUrl,
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
    @apply tw-px-8;
  }

  &__sidebar {
    @apply tw-col-start-1;
    @apply tw-col-span-6;
    @apply tw-flex;
    @apply tw-flex-col;
    @apply tw-gap-5;
    @apply tw-items-center;
    @apply tw-justify-between;
    @apply tw-px-4;
    @apply tw-border-b-8;
    @apply tw-border-b-pv-white;
    @apply tw-pb-4;

    @screen md {
      @apply tw-col-start-1;
      @apply tw-col-span-8;
      @apply tw-flex-row;
      @apply tw-px-8;
    }

    @screen lg {
      @apply tw-col-start-1;
      @apply tw-col-span-3;
      @apply tw-flex-col;
      @apply tw-items-start;
      @apply tw-justify-start;
      @apply tw-px-0;
      @apply tw-pb-0;
      @apply tw-border-b-0;
    }

    .advanced-search {
      &__headline {
        @apply tw-font-bold;
        @apply tw-hidden;

        @screen md {
          @apply tw-block;
        }
      }

      &__text {
        @apply tw-mt-2;

        @screen lg {
          @apply tw-mt-3;
        }
      }

      &__link {
        @apply tw-w-full;

        @screen md {
          @apply tw-w-auto;
        }

        .button {
          @apply tw-box-border;
          @apply tw-w-full;
        }
      }
    }
  }

  &__documents {
    @apply tw-col-start-1;
    @apply tw-col-span-6;
    @apply tw-px-4;

    @screen md {
      @apply tw-col-start-1;
      @apply tw-col-span-8;
      @apply tw-px-8;
    }

    @screen lg {
      @apply tw-col-start-4;
      @apply tw-col-span-9;
      @apply tw-px-0;
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

  &__error-handling {
    &.error-handling {
      @apply tw-pt-[52px];
      @apply tw-pb-[48px];
    }
  }
}
</style>
