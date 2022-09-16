<template>
  <div class="product-card-grid">
    <ul class="product-card-grid__products">
      <li v-for="product in products" :key="product.code">
        <ProductCard :product="product" />
      </li>
    </ul>
  </div>
</template>

<script>
import ProductCard from '~/components/molecules/ProductCard/ProductCard.vue'

export default {
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.product-card-grid {
  &__products {
    @apply tw-grid tw-grid-cols-1 tw-gap-4;

    @screen md {
      @apply tw-grid-cols-3;
    }
  }
}
</style>
