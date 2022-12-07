<template>
  <GenericAccordion
    :accordion-entries="[
      {
        slotName: 'accessories-carousel',
        disabled: false,
        label: headline,
      },
    ]"
  >
    <template #accessories-carousel>
      <AccessoriesCardCarousel
        background="grey"
        :entries="hasRecommendedAccessories"
      />
    </template>
  </GenericAccordion>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion'
import AccessoriesCardCarousel from '~/components/organisms/AccessoriesCardCarousel/AccessoriesCardCarousel'
import { useProductStore } from '~/stores/product'

export default defineComponent({
  components: {
    GenericAccordion,
    AccessoriesCardCarousel,
  },
  props: {
    /**
     * The heading tag
     */
    headline: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { product } = useProductStore()

    // In die Products.js auslagern
    const hasRecommendedAccessories = computed(() => {
      if (product && product.productReferences) {
        return product.productReferences.filter(
          (o) => o.referenceType === 'RECOMMENDEDACCESSORIES'
        )
      }
      return []
    })

    return {
      hasRecommendedAccessories,
    }
  },
})
</script>
