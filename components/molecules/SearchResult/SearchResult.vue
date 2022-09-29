<template>
  <div>
    <ProductCardGrid :products="products" />
    <Pagination :total-pages="pagination" />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ProductCardGrid from '~/components/organisms/ProductCardGrid/ProductCardGrid.vue'
import Pagination from '~/components/molecules/Pagination/Pagination.vue'

export default defineComponent({
  name: 'SearchResult',
  components: { ProductCardGrid, Pagination },
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
  },
  setup() {},
})
</script>

<style lang="scss"></style>
