<template>
  <div class="product-card-grid">
    <ul
      class="product-card-grid__products"
      :class="`product-card-grid__products--${
        useKnowledgeCard ? 'knowledge' : 'category'
      }`"
    >
      <li v-for="(product, index) in products" :key="index">
        <component
          :is="useKnowledgeCard ? 'KnowledgeCard' : 'ProductCard'"
          v-bind="{
            product: useKnowledgeCard ? null : product,
            entry: useKnowledgeCard ? product : null,
          }"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import ProductCard from '~/components/molecules/ProductCard/ProductCard.vue'
import KnowledgeCard from '~/components/molecules/KnowledgeCard/KnowledgeCard'

export default defineComponent({
  name: 'ProductCardGrid',
  components: {
    ProductCard,
    KnowledgeCard,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
    useKnowledgeCard: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.product-card-grid {
  &__products {
    @apply tw-grid tw-grid-cols-1 tw-gap-4;

    @screen md {
      @apply tw-grid-cols-3;
    }

    &--knowledge {
      @screen lg {
        @apply tw-grid-cols-4;
      }
    }
  }
}
</style>
