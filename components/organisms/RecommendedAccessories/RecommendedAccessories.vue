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
        :entries="productReferencesRecommendedAccessories"
      />
    </template>
  </GenericAccordion>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
    const { productReferencesRecommendedAccessories } = useProductStore()

    return {
      productReferencesRecommendedAccessories,
    }
  },
})
</script>
