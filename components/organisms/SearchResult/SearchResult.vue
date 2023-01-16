<template>
  <div class="search-result tw-grid-container">
    <div class="search-result__category">
      <CategoryTree :categories="categories" />
    </div>
    <div class="search-result__products">
      <Facets
        class="search-result__facets"
        v-bind="{ facets, currentQuery, sorts }"
        @updateSort="pushSortToQuery"
        @updateFacets="pushFacetsToQuery"
      />
      <AdressDataItem
        icon="mail"
        headline="Headline"
        :address="addressData"
        :is-billing-address="false"
        :editable="true"
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

    const addressData = {
      companyName: 'Company',
      firstName: 'Uwe',
      lastName: 'Unterdruck',
      line1: 'Hochdruckstraße',
      line2: '80',
      remarks: 'remarks',
      postalCode: '81541',
      town: 'München',
      country: {
        isocode: 'DEU',
      },
      phone: '+49123456789',
      printer: '+49123456789',
      email: 'unterdruck@mail.com',
    }

    return {
      updatePageSize,
      pushSortToQuery,
      pushFacetsToQuery,
      pageSize,
      addressData,
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
    @apply tw-mt-2;

    @screen md {
      @apply tw-mt-0;
    }
  }
}
</style>
