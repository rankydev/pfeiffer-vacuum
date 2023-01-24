<template>
  <div class="variant-selection-accordion">
    <GenericAccordion
      v-bind="{ accordionEntries, loading, variant: 'variationmatrix' }"
    >
      <template v-for="item in accordionEntries" #[item.slotName]="slotScope">
        <!-- eslint-disable-next-line vue/no-v-for-template-key-on-child -->
        <div :key="item.slotName">
          <div
            v-if="item.info"
            class="variant-selection-accordion__information-text"
          >
            <Icon icon="info_outline" />
            <span>{{ item.info }}</span>
          </div>
          <AttributeButtons
            :items="item.variant.variationValues.filter((el) => el.selectable)"
            :attribute-code="item.variant.code"
            class="variant-selection-accordion__attributes"
            @selected="slotScope.next(firstNotSelectedIndex)"
          />
          <div
            v-if="
              item.variant.variationValues.filter((el) => !el.selectable).length
            "
            class="variant-selection-accordion__not-selectable-wrapper"
          >
            <Button
              class="variant-selection-accordion__not-selectable-button"
              shape="plain"
              variant="secondary"
              :text-center="true"
              :label="
                hasOpenNotSelectable(item.slotName)
                  ? $t('product.hideNotSelectable')
                  : $t('product.showNotSelectable')
              "
              :icon="
                hasOpenNotSelectable(item.slotName) ? 'arrow_upward' : null
              "
              @click="toggleNotSelectable(item.slotName)"
            />
            <AnimatedCollapse speed="medium">
              <AttributeButtons
                v-if="hasOpenNotSelectable(item.slotName)"
                :items="
                  item.variant.variationValues.filter((el) => !el.selectable)
                "
                :attribute-code="item.variant.code"
              />
            </AnimatedCollapse>
          </div>
        </div>
      </template>
    </GenericAccordion>
  </div>
</template>
<script>
import { ref } from '@nuxtjs/composition-api'
import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion'
import AttributeButtons from './AttributeButtons'
import { storeToRefs } from 'pinia'
import { useVariationmatrixStore } from '~/stores/product'

export default {
  name: 'AttributeAccordion',
  components: { GenericAccordion, AttributeButtons },
  props: {
    accordionEntries: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const variationmatrixStore = useVariationmatrixStore()
    const { firstNotSelectedIndex } = storeToRefs(variationmatrixStore)

    const openedSlots = ref([])

    const hasOpenNotSelectable = (slotName) => {
      return openedSlots.value.includes(slotName)
    }

    const toggleNotSelectable = (id) => {
      if (openedSlots.value.includes(id)) {
        openedSlots.value = openedSlots.value.filter((value) => value !== id)
      } else {
        openedSlots.value = [...openedSlots.value, id]
      }
    }

    return { toggleNotSelectable, hasOpenNotSelectable, firstNotSelectedIndex }
  },
}
</script>
<style lang="scss" scoped>
.variant-selection-accordion {
  @apply tw-mb-9;

  &__attributes {
    @apply tw-mt-2;
    @apply tw-mb-5;
  }

  &__not-selectable-wrapper {
    @apply tw-mb-5;
  }

  &__not-selectable-button {
    @apply tw-mb-2;
  }

  &__information-text {
    @apply tw-flex;
    @apply tw-items-center tw-justify-start;
    @apply tw-gap-2;
    @apply tw-mb-4 tw-mt-1;
    @apply tw-text-pv-grey-48;
    @apply tw-text-sm;
  }
}
</style>
