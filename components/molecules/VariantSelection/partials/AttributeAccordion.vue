<template>
  <div class="variant-selection-accordion">
    <GenericAccordion v-bind="{ accordionEntries, loading }" multiple>
      <template v-for="item in accordionEntries" #[item.slotName]>
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
import GenericAccordion from '~/components/atoms/GenericAccordion/GenericAccordion'
import AttributeButtons from './AttributeButtons'

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
}
</script>
