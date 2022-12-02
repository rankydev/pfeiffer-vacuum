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
      <!-- eslint-disable-next-line vue/valid-v-for -->
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
    /**
     * Allow multiple open items at the same time
     */
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { product } = useProductStore()

    const hasRecommendedAccessories = computed(() => {
      if (product && product.productReferences) {
        return product.productReferences.filter(
          (o) => o.referenceType === 'RECOMMENDEDACCESSORIES'
        )
      }
      return []
    })

    console.log(hasRecommendedAccessories.value)

    const mappedAccordionEntries = computed(() => {
      return props.accordionEntries.map((item, index) => {
        return {
          ...item,
          slotName: index,
        }
      })
    })

    return {
      mappedAccordionEntries,
      hasRecommendedAccessories,
    }
  },
})
</script>
