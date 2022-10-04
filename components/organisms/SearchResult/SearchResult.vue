<template>
  <div class="search-result tw-grid-container">
    <div class="search-result__category">
      <CategoryTree :categories="categories" />
    </div>
    <div class="search-result__products">
      <ProductCardGrid :products="products" />
      <Pagination class="search-result__pagination" :total-pages="pagination" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ProductCardGrid from '~/components/organisms/ProductCardGrid/ProductCardGrid.vue'
import Pagination from '~/components/molecules/Pagination/Pagination.vue'
import CategoryTree from '~/components/molecules/CategoryTree/CategoryTree.vue'

export default defineComponent({
  name: 'SearchResult',
  components: { ProductCardGrid, Pagination, CategoryTree },
  props: {
    headline: {
      type: String,
      default: '',
    },
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
      required: true,
    },
  },
  setup() {},
})
</script>

<style lang="scss">
.search-result {
  @apply tw-bg-pv-grey-96;
  @apply tw-pt-4;
  @apply tw-pb-6;

  @screen lg {
    @apply tw-pt-8;
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

  &__pagination {
    @apply tw-mt-4;
    @apply tw-flex;
    @apply tw-justify-center;

    @screen lg {
      @apply tw-justify-start;
    }
  }
}
</style>
