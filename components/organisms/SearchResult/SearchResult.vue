<template>
  <div class="search-result tw-grid-container">
    <div class="search-result__category">
      <CategoryTree :categories="categories" />
    </div>
    <div class="search-result__products">
      <div v-if="pagination.totalResults" class="search-result__total-count">
        {{
          $t('category.resultsFound', { totalResults: pagination.totalResults })
        }}
      </div>
      <Facets
        class="search-result__facets"
        v-bind="{ facets, currentQuery, sorts }"
        @updateSort="pushSortToQuery"
        @updateFacets="pushFacetsToQuery"
      />
      <ProductCardGrid v-if="products.length > 0" :products="products" />
      <div v-else>
        <h2>{{ $t('category.noMatchingProducts') }}</h2>
        <span>{{ $t('category.checkSearchCriteria') }}</span>
      </div>
      <div class="search-result__pages">
        <CategoryPageSizeSelection
          :active="parseInt(pageSize)"
          @change="updatePageSize"
        />
        <Pagination
          class="search-result__pagination"
          :total-pages="pagination.totalPages"
        />
      </div>
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
import ProductCardGrid from '~/components/organisms/ProductCardGrid/ProductCardGrid.vue'
import Pagination from '~/components/molecules/Pagination/Pagination.vue'
import CategoryTree from '~/components/molecules/CategoryTree/CategoryTree.vue'
import CategoryPageSizeSelection from '~/components/molecules/CategoryPageSizeSelection/CategoryPageSizeSelection.vue'
import Facets from '~/components/molecules/Facets/Facets.vue'

export default defineComponent({
  name: 'SearchResult',
  components: {
    ProductCardGrid,
    Pagination,
    CategoryTree,
    CategoryPageSizeSelection,
    Facets,
  },
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    pagination: {
      type: Object,
      required: true,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    facets: {
      type: Array,
      required: true,
    },
    currentQuery: {
      type: Object,
      default: () => ({}),
    },
    sorts: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const pageSize = computed(() => route.value.query?.pageSize || 9)

    const updatePageSize = (e) => {
      router.push({
        query: {
          ...route.value.query,
          pageSize: e,
          currentPage: 1,
        },
      })
    }

    const pushSortToQuery = (e) => {
      router.push({
        query: { ...route.value.query, sort: e.code, currentPage: 1 },
      })
    }

    const pushFacetsToQuery = (e) => {
      let joinedFacets = ''
      e.forEach((item, i) => {
        joinedFacets += `${i > 0 ? ':' : ''}${item.key}:${item.value}`
      })
      router.push({
        query: {
          ...route.value.query,
          facets: joinedFacets.length ? joinedFacets : undefined,
          currentPage: 1,
        },
      })
    }

    return {
      updatePageSize,
      pushSortToQuery,
      pushFacetsToQuery,
      pageSize,
    }
  },
})
</script>

<style lang="scss">
.search-result {
  @apply tw-bg-pv-grey-96;
  @apply tw-pt-4;
  @apply tw-pb-6;

  @screen lg {
    @apply tw-pt-10;
    @apply tw-pb-12;
  }

  &__category {
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

  &__products {
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

  &__total-count {
    @apply tw-text-pv-grey-48;
    @apply tw-text-xs;
    @apply tw-mb-4;
  }

  &__facets {
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
