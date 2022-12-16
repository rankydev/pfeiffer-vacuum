<template>
  <div class="variant-selection-accordion">
    <GenericAccordion
      :accordion-entries="variantTabItems"
      multiple
      v-bind="{ loading }"
    >
      <template v-for="item in variantTabItems" #[item.slotName]>
        <!-- eslint-disable-next-line vue/no-v-for-template-key-on-child -->
        <div :key="item.slotName">
          <AttributeButtons
            :items="
              item.variant.variationValues.filter((item) => item.selectable)
            "
            :attribute-code="item.variant.code"
          />
          <div
            v-if="
              item.variant.variationValues.filter((item) => !item.selectable)
                .length
            "
          >
            <p class="tw-mt-4 tw-mb-2">Not selectable anymore</p>
            <AttributeButtons
              :items="
                item.variant.variationValues.filter((item) => !item.selectable)
              "
              :attribute-code="item.variant.code"
            />
          </div>
        </div>
      </template>
    </GenericAccordion>
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import { useVariationmatrixStore } from '~/stores/product'
import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion'
import AttributeButtons from './partials/AttributeButtons'

export default defineComponent({
  components: {
    GenericAccordion,
    AttributeButtons,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const variationmatrixStore = useVariationmatrixStore()
    const { variationMatrix } = storeToRefs(variationmatrixStore)

    const variantTabItems = computed(() => {
      if (!variationMatrix.value) {
        return []
      }
      return (variationMatrix.value || {}).variationAttributes.map(
        (variant) => {
          const hasSomeSelected = variant.variationValues.find(
            (item) => item.selected
          )
          const hasSomeSelectable = variant.variationValues.some(
            (item) => item.selectable
          )

          return {
            slotName: variant.name,
            label: hasSomeSelected
              ? `${variant.name}: ${hasSomeSelected.displayValue}`
              : variant.name,
            disabled: !hasSomeSelectable,
            icon: hasSomeSelected ? 'check_circle' : null,
            expandIcon: hasSomeSelectable ? 'edit' : 'edit_off',
            variant,
            isActive: true, // TODO: remove later, just for testing
          }
        }
      )
    })

    return {
      variantTabItems,
    }
  },
})
</script>
<style lang="scss" scoped>
.variant-selection-accordion {
  @apply tw-ml-4;
  @apply tw-mr-4;
  @apply tw-bg-pv-grey-96;
}
</style>
