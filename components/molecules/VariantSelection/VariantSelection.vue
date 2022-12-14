<template>
  <div class="variant-selection-accordion">
    <GenericAccordion :accordion-entries="variantTabItems" multiple>
      <template v-for="item in variantTabItems" #[item.slotName]>
        <!-- eslint-disable-next-line vue/no-v-for-template-key-on-child -->
        <div :key="item.slotName">
          <AttributeButtons :values="item.variant.variationValues" />
        </div>
      </template>
    </GenericAccordion>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion'
import { useProductStore } from '~/stores/product'
import AttributeButtons from './partials/AttributeButtons'

export default defineComponent({
  components: {
    GenericAccordion,
    AttributeButtons,
  },
  setup() {
    const productStore = useProductStore()
    const { variationMatrix } = storeToRefs(productStore)

    const variantTabItems = computed(() => {
      return variationMatrix.value.variationAttributes.map((variant) => {
        const hasSomeSelected = variant.variationValues.some(
          (item) => item.selected
        )
        const hasSomeSelectable = variant.variationValues.some(
          (item) => item.selectable
        )

        return {
          slotName: variant.name,
          label: variant.name,
          disabled: !hasSomeSelectable,
          icon: hasSomeSelected ? 'check_circle' : null,
          expandIcon: hasSomeSelectable ? 'edit' : 'edit_off',
          variant,
          isActive: true,
        }
      })
    })

    return {
      variantTabItems,
    }
  },
})
</script>
<style lang="scss">
.variant-selection-accordion {
  @apply tw-ml-4;
  @apply tw-mr-4;
  @apply tw-bg-pv-grey-96;
}
</style>
