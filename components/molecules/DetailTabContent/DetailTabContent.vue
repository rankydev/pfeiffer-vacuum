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
      <ProductTechnicalData :features="getSortedFeatures()" />
    </div>
    <div
      v-if="lastTabSelected === 'dimensions'"
      :title="$t('product.dimensions')"
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
import ProductInformation from '~/components/molecules/ProductInformation/ProductInformation'
import ProductTechnicalData from '~/components/molecules/ProductTechnicalData/ProductTechnicalData.vue'
import { useProductStore } from '~/stores/product'
import Dimensions from './dimensions/Dimensions.vue'

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

    const getSortedFeatures = () => {
      const code = 'TechnicalData'

      if (!product || !product.typedFeatureList) {
        return []
      }

      const data = product.typedFeatureList.filter((o) => o.code === code)

      if (data && data?.length > 0) {
        const features = [...data[0].features]
        return features.sort((a, b) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()

          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }

          return 0
        })
      } else {
        return []
      }
    }

    return {
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
}
</style>
