<template>
  <div v-if="productReferencesConsumables.length" class="product-consumables">
    <div class="product-consumables__carousel-wrapper">
      <AccessoriesCardCarousel
        :headline="$t('product.consumables')"
        :entries="productReferencesConsumables"
        :use-sub-headlines="false"
      />
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import AccessoriesCardCarousel from '~/components/organisms/AccessoriesCardCarousel/AccessoriesCardCarousel'
import { useProductStore } from '~/stores/product'

export default {
  name: 'ProductAccessories',
  components: {
    AccessoriesCardCarousel,
  },
  setup() {
    const productStore = useProductStore()
    const { productReferencesConsumables } = storeToRefs(productStore)

    return {
      productReferencesConsumables,
    }
  },
}
</script>

<style lang="scss" scoped>
.product-consumables {
  @apply tw-w-full;

  &__carousel-wrapper {
    @apply tw-bg-pv-grey-96;
    @apply tw-pt-5;
  }
}
</style>
