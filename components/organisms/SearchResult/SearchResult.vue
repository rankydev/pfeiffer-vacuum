<template>
  <div class="search-result tw-grid-container">
    <div class="search-result__category">
      <CategoryTree :categories="categories" />
    </div>
    <div class="search-result__products">
      <Facets
        v-bind="{ facets, currentQuery, sorts }"
        @updateSort="pushSortToQuery"
      />
      <ProductCardGrid :products="products" />
      <div class="search-result__pages">
        <CategoryPageSizeSelection
          :active="pageSize"
          @change="updatePageSize"
        />
        <Pagination
          class="search-result__pagination"
          :total-pages="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
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
      type: Number,
      default: 1,
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
      default: () => {},
    },
    sorts: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    let pageSize = ref(props.pagination.pageSize)

    const updatePageSize = (e) => {
      pageSize.value = e
      console.log(pageSize.value)
    }

    const pushSortToQuery = (e) => {
      console.log(router)
      console.log(route)
      console.log(e)
      router.push({ query: { ...route.value.query, sort: e.code } })
    }

    return { updatePageSize, pushSortToQuery, pageSize }
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
