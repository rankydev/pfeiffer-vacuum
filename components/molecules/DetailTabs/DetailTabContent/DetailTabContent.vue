<template>
  <div class="tab-content">
    <div v-if="lastTabSelected === 'productInfo'">
      <ProductInformation />
    </div>
    <div
      v-if="lastTabSelected === 'technicalData'"
      class="tab-content__technicalData"
    >
      <ProductTechnicalData
        :features="getSortedFeatures(product, 'TechnicalData')"
      />
    </div>
    <div
      v-if="lastTabSelected === 'dimensions'"
      class="tab-content__dimensions"
    >
      <Dimensions />
    </div>
    <div v-if="lastTabSelected === 'accessories'"></div>
    <div v-if="lastTabSelected === 'consumables'"></div>
    <div v-if="lastTabSelected === 'spareparts'"></div>
    <!-- Service Tab should not be visible in MVP -->
    <div v-if="false">Service</div>
    <div v-if="lastTabSelected === 'downloads'"></div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/product'
import ProductInformation from './ProductInformation/ProductInformation'
import ProductTechnicalData from './ProductTechnicalData/ProductTechnicalData'
import Dimensions from './Dimensions/Dimensions'
import getSortedFeatures from '../partials/getSortedFeatures'

export default defineComponent({
  components: { ProductTechnicalData, ProductInformation, Dimensions },
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
