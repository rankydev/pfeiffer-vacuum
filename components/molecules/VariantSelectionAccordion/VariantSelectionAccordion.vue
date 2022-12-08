<template>
  <div class="variant-selection-accordion">
    <div v-for="variant in variants" :key="variant.code">
      <GenericAccordion
        :accordion-entries="[
          {
            slotName: 'variants',
            disabled: false,
            label: variant.name,
            isActive: false,
            icon: icon,
          },
        ]"
        expand-icon="edit"
      >
        <template #variants>
          {{ variant.variationValues }}
        </template>
      </GenericAccordion>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion'
import { useProductStore } from '~/stores/product'

export default defineComponent({
  components: {
    GenericAccordion,
  },
  setup() {
    const { variationMatrix } = useProductStore()

    const variants = ref(variationMatrix.variationAttributes)

    const icon = ref('check_circle')

    // List of Icon names that have to be handled by the Variant Selection
    // edit
    // edit_off
    // check_circle

    return {
      variants,
      icon,
    }
  },
})
</script>
<style lang="scss">
.variant-selection-accordion {
  margin-left: 16px;
  margin-right: 16px;
  @apply tw-bg-pv-grey-96;
}
</style>
