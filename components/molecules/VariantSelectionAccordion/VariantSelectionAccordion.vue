<template>
  <div class="variant-selection-accordion">
    <GenericAccordion :accordion-entries="variantTabItems">
      <template v-for="item in variantTabItems" #[item.slotName]>
        <!-- eslint-disable-next-line vue/no-v-for-template-key-on-child -->
        <div :key="item.slotName">
          Use this information to display the selection
          <pre>
            {{ item.variant }}
          </pre>
        </div>
      </template>
    </GenericAccordion>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from '@nuxtjs/composition-api'
import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion'
import { useProductStore } from '~/stores/product'

export default defineComponent({
  components: {
    GenericAccordion,
  },
  setup() {
    const { variationMatrix } = useProductStore()

    const variants = ref(variationMatrix.variationAttributes)

    const variantTabItems = computed(() => {
      return variants.value.map((variant) => {
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
