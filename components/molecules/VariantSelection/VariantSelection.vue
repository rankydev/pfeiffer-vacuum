<template>
  <LoadingSpinner
    class="variant-selection"
    :show="loadingMatrix && !variationAttributeEntries.length"
    color="red"
  >
    <div v-if="showVariantSelection" class="variant-selection__headline">
      <h3>
        {{ $t('product.selectVariant') }}
      </h3>
      <Button
        v-if="Object.keys(selectedAttributes).length > 0"
        :label="
          currentVariantId
            ? $t('product.startNew')
            : $t('product.resetSelection')
        "
        variant="secondary"
        shape="plain"
        :icon="currentVariantId ? 'arrow_back' : null"
        prepend-icon
        class="variant-selection__reset-button"
        @click="clearSelection"
      />
    </div>
    <AttributeAccordion
      v-if="showVariantSelection"
      :loading="loadingMatrix"
      :accordion-entries="variationAttributeEntries"
    />
    <PvSelect
      v-if="dropdownItems.length"
      :options="dropdownItems"
      :placeholder="$t('product.pleaseSelectVariant')"
      :value="selectedVariantLabel"
      class="variant-selection__dropdown"
      @input="manualVariantSelected"
    />
    <ProductActions />
  </LoadingSpinner>
</template>

<script>
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'
import { storeToRefs } from 'pinia'
import { useVariationmatrixStore, useProductStore } from '~/stores/product'
import LoadingSpinner from '~/components/atoms/LoadingSpinner/LoadingSpinner'
import PvSelect from '~/components/atoms/FormComponents/PvSelect/PvSelect'
import AttributeAccordion from './partials/AttributeAccordion'
import ProductActions from './partials/ProductActions'

export default defineComponent({
  name: 'VariantSelection',
  components: {
    AttributeAccordion,
    ProductActions,
    LoadingSpinner,
    PvSelect,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const productStore = useProductStore()
    const variationmatrixStore = useVariationmatrixStore()
    const {
      variationMatrix,
      loadingMatrix,
      clearSelection,
      firstNotSelectedIndex,
      selectedAttributes,
      manualVariantSelectionOptions,
      currentVariantId,
    } = storeToRefs(variationmatrixStore)
    const { productType } = storeToRefs(productStore)
    const { i18n } = useContext()

    const showVariantSelection = computed(() =>
      ['MASTERPRODUCT', 'VARIANTPRODUCT'].includes(productType.value)
    )

    const variationAttributeEntries = computed(() => {
      if (!variationMatrix.value?.variationAttributes) {
        return []
      }
      return variationMatrix.value.variationAttributes.map((variant, index) => {
        const hasSomeSelected = variant.variationValues.find(
          (item) => item.selected || item.automaticallySelected
        )
        const hasAutomaticallySelected =
          variant.variationValues.some((item) => item.automaticallySelected) &&
          !variant.variationValues.some((item) => item.selected)

        const hasSomeSelectable = variant.variationValues.some(
          (item) => item.selectable
        )
        const hasMoreThanOneSelectable =
          variant.variationValues.filter((item) => item.selectable).length > 1

        return {
          slotName: variant.name,
          info: hasAutomaticallySelected
            ? i18n.t('product.automaticallySelectedInfo')
            : null,
          label: hasSomeSelected
            ? `${variant.name}: <span class="tw-font-normal">${hasSomeSelected.displayValue}</span>`
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
      })
    })

    const dropdownItems = computed(() => {
      return manualVariantSelectionOptions.value.map((item) => {
        return {
          value: item.code,
          label: item.name,
          disabled: item.code === currentVariantId.value,
        }
      })
    })

    const selectedVariantLabel = computed(() => {
      const variant = manualVariantSelectionOptions.value.find((item) => {
        return item.code === currentVariantId.value
      })
      return variant?.name || ''
    })

    const manualVariantSelected = (selectItem) => {
      variationmatrixStore.redirectToId(selectItem.value)
    }

    return {
      variationAttributeEntries,
      loadingMatrix,
      clearSelection,
      selectedAttributes,
      showVariantSelection,
      currentVariantId,
      dropdownItems,
      selectedVariantLabel,
      manualVariantSelected,
    }
  },
})
</script>
<style lang="scss">
.variant-selection {
  @apply tw-p-6;
  @apply tw-bg-pv-grey-96;
  @apply tw-rounded-lg;
  min-height: 400px;

  &__headline {
    @apply tw-flex;
    @apply tw-items-center;
    @apply tw-mb-5;
  }

  &__reset-button {
    @apply tw-ml-auto;
    flex-basis: content;
  }

  &__expand-icon {
    &--on {
      @apply tw-text-pv-red;
    }

    &--off {
      @apply tw-text-pv-grey-80;
    }
  }

  &__dropdown {
    @apply tw-mt-3;

    // TODO: why its needed to fix this here and its not correct in the component? copied this fix from ProductAccessories.vue
    .pv-select__search-helper {
      @apply tw-h-0;
    }
  }
}
</style>
