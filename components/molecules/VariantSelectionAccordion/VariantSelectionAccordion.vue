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

        return {
          slotName: variant.name,
          label: variant.name,
          disabled: variant.selectable,
          icon: 'check_circle',
          expandIcon: hasSomeSelected ? 'edit' : 'edit_off',
          variant,
        }
      })
    })

    const icon = ref('check_circle')

    // List of Icon names that have to be handled by the Variant Selection
    // edit
    // edit_off
    // check_circle

    return {
      variantTabItems,
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
