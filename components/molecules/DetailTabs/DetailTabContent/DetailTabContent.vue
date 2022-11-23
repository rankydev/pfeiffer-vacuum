<template>
  <div class="tab-content">
    <div
      v-if="lastTabSelected === 'productInfo'"
      :title="$t('product.productInformation')"
    >
      <ProductInformation />
    </div>
    <div
      v-if="lastTabSelected === 'technicalData'"
      class="tab-content__technicalData"
      :title="$t('product.technicalData')"
    >
      <ProductTechnicalData
        :features="getSortedFeatures(product, 'TechnicalData')"
      />
    </div>
    <div
      v-if="lastTabSelected === 'dimensions'"
      :title="$t('product.dimensions')"
      class="tab-content__dimensions"
    >
      <Dimensions />
    </div>
    <div
      v-if="lastTabSelected === 'accessories'"
      :title="$t('product.accessories')"
    ></div>
    <div
      v-if="lastTabSelected === 'consumables'"
      :title="$t('product.consumables')"
    ></div>
    <div
      v-if="lastTabSelected === 'spareparts'"
      :title="$t('product.spareParts')"
    ></div>
    <!-- Service Tab should not be visible in MVP -->
    <div v-if="false" :title="$t('product.service')">Service</div>
    <div
      v-if="lastTabSelected === 'downloads'"
      :title="$t('product.downloads')"
    ></div>
  </div>
</template>

<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import { useProductStore } from '~/stores/product'
import ProductInformation from './ProductInformation/ProductInformation'
import ProductTechnicalData from './ProductTechnicalData/ProductTechnicalData'
import Dimensions from './Dimensions/Dimensions'
import { useTabsHelper } from '../partials/useTabsHelper'

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
    const { getSortedFeatures } = useTabsHelper()

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
