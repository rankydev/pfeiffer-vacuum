<template>
  <div v-if="productReferencesConsumables.length" class="product-consumables">
    <Infobox :text="$t('product.previousVersionsSpareParts')" />
    <div class="product-consumables__carousel-wrapper">
      <AccessoriesCardCarousel
        :headline="$t('product.spareParts')"
        :entries="productReferencesConsumables"
        :use-sub-headlines="false"
      />
    </div>
  </div>
</template>

<script>
import AccessoriesCardCarousel from '~/components/organisms/AccessoriesCardCarousel/AccessoriesCardCarousel'
import Infobox from '~/components/molecules/Infobox/Infobox'
import { useProductStore } from '~/stores/product'

export default {
  name: 'ProductAccessories',
  components: {
    Infobox,
    AccessoriesCardCarousel,
  },
  setup() {
    const { productReferencesConsumables } = useProductStore()

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
