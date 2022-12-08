<template>
  <GenericAccordion
    :accordion-entries="[
      {
        slotName: 'accessories-carousel',
        disabled: false,
        label: headline,
        isActive: true,
      },
    ]"
  >
    <template #accessories-carousel>
      <AccessoriesCardCarousel
        class="accessories-carousel__bg-grey"
        :entries="recommendedAccessories"
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
    const { recommendedAccessories } = useProductStore()

    return {
      recommendedAccessories,
    }
  },
})
</script>
<style lang="scss">
.accessories-carousel {
  &__bg-grey {
    @apply tw-bg-pv-grey-96;
  }
}
</style>
