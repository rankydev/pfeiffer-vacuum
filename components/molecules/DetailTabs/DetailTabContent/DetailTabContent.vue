<template>
  <div class="tab-content">
    <ProductInformation v-if="lastTabSelected === 'productInfo'" />

    <ProductTechnicalData
      v-if="lastTabSelected === 'technicalData'"
      class="tab-content__technicalData"
      :features="getSortedFeatures(product, 'TechnicalData')"
    />

    <Dimensions
      v-if="lastTabSelected === 'dimensions'"
      class="tab-content__dimensions"
    />

    <ProductAccessories v-if="lastTabSelected === 'accessories'" />
    <ProductConsumables v-if="lastTabSelected === 'consumables'" />
    <ProductSpareParts v-if="lastTabSelected === 'spareparts'" />
    <!-- Service Tab should not be visible in MVP -->
    <div v-if="false">Service</div>
    <ProductFiles v-if="lastTabSelected === 'downloads'" />
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/product'
import ProductInformation from './ProductInformation/ProductInformation'
import ProductTechnicalData from './ProductTechnicalData/ProductTechnicalData'
import Dimensions from './Dimensions/Dimensions'
import getSortedFeatures from '../partials/getSortedFeatures'
import ProductFiles from './ProductFiles/ProductFiles'
import ProductAccessories from './ProductAccessories/ProductAccessories'
import ProductConsumables from './ProductConsumables/ProductConsumables'
import ProductSpareParts from './ProductSpareParts/ProductSpareParts'

export default defineComponent({
  components: {
    ProductTechnicalData,
    ProductInformation,
    Dimensions,
    ProductFiles,
    ProductAccessories,
    ProductConsumables,
    ProductSpareParts,
  },
  props: {
    lastTabSelected: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { i18n } = useContext()
    const { product } = useProductStore()

    return {
      product,
      getSortedFeatures,
      i18n,
    }
  },
})
</script>

<style lang="scss">
.tab-content {
  &__technicalData {
    @apply tw-w-full;
  }

  &__dimensions {
    @apply tw-m-auto;
  }
}
</style>
