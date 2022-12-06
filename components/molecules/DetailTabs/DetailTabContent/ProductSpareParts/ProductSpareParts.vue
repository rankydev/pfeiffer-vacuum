<template>
  <div v-if="productReferencesSpareParts.length" class="product-spareparts">
    <Infobox :text="$t('product.previousVersionsSpareParts')" />
    <div class="product-spareparts__carousel-wrapper">
      <AccessoriesCardCarousel
        :headline="$t('product.spareParts')"
        :entries="productReferencesSpareParts"
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
    const { productReferencesSpareParts } = useProductStore()

    return {
      productReferencesSpareParts,
    }
  },
}
</script>

<style lang="scss" scoped>
.product-spareparts {
  @apply tw-w-full;

  &__carousel-wrapper {
    @apply tw-bg-pv-grey-96;
    @apply tw-pt-5;
  }
}
</style>
