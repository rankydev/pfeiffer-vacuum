<template>
  <div class="variant-selection">
    <div class="variant-selection__headline">
      <h3>{{ $t('product.selectVariant') }}</h3>
      <Button
        v-if="Object.keys(selectedAttributes).length > 0"
        :label="
          isSelectionCompleted
            ? $t('product.startNew')
            : $t('product.resetSelection')
        "
        variant="secondary"
        shape="plain"
        :icon="isSelectionCompleted ? 'arrow_back' : null"
        prepend-icon
        class="variant-selection__reset-button"
        @click="clearSelection"
      />
    </div>
    <AttributeAccordion
      :loading="loadingMatrix"
      :accordion-entries="variationAttributeEntries"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import { useVariationmatrixStore } from '~/stores/product'
import AttributeAccordion from './partials/AttributeAccordion'

export default defineComponent({
  components: {
    AttributeAccordion,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const variationmatrixStore = useVariationmatrixStore()
    const {
      variationMatrix,
      loadingMatrix,
      clearSelection,
      isSelectionCompleted,
      firstNotSelectedIndex,
      selectedAttributes,
    } = storeToRefs(variationmatrixStore)

    const variationAttributeEntries = computed(() => {
      if (!variationMatrix.value?.variationAttributes) {
        return []
      }
      return (variationMatrix.value || {}).variationAttributes.map(
        (variant, index) => {
          const hasSomeSelected = variant.variationValues.find(
            (item) => item.selected || item.automaticallySelected
          )
          const hasSomeSelectable = variant.variationValues.some(
            (item) => item.selectable
          )
          const hasMoreThanOneSelectable =
            variant.variationValues.filter((item) => item.selectable).length > 1

          return {
            slotName: variant.name,
            label: hasSomeSelected
              ? `<span class="variant-selection__accordion-header">${variant.name}: <span class="variant-selection__accordion-header--bold">${hasSomeSelected.displayValue}<span/></span>`
              : variant.name,
            disabled: !hasSomeSelectable,
            icon: hasSomeSelected ? 'check_circle' : null,
            expandIcon: hasSomeSelected
              ? hasMoreThanOneSelectable
                ? 'edit'
                : 'edit_off'
              : null,
            expandIconClass: hasSomeSelected
              ? hasMoreThanOneSelectable
                ? 'variant-selection__expand-icon--on'
                : 'variant-selection__expand-icon--off'
              : null,
            variant,
            isActive: index === firstNotSelectedIndex.value,
          }
        }
      )
    })

    return {
      variationAttributeEntries,
      loadingMatrix,
      clearSelection,
      selectedAttributes,
      isSelectionCompleted,
    }
  },
})
</script>
<style lang="scss">
.variant-selection {
  @apply tw-p-6;
  @apply tw-bg-pv-grey-96;
  @apply tw-rounded-lg;

  &__headline {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-mb-5;
  }

  &__reset-button {
    @apply tw-ml-auto;
  }

  &__accordion-header {
    @apply tw-font-normal;

    &--bold {
      @apply tw-font-bold;
    }
  }

  &__expand-icon {
    &--on {
      @apply tw-text-pv-red;
    }

    &--off {
      @apply tw-text-pv-grey-80;
    }
  }
}
</style>
