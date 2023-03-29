<template>
  <div
    class="attribute-buttons"
    :class="{
      'attribute-buttons--three-cols': items.length > 4 || items.length === 3,
      'attribute-buttons--one-col': items.length === 1,
    }"
    v-bind="lang"
  >
    <Button
      v-for="item in items"
      :key="item.value"
      :label="item.displayValue"
      :variant="
        isItemPreselected(item)
          ? 'variant-selection-preselected'
          : 'variant-selection'
      "
      :shape="
        item.automaticallySelected || item.selected || !item.selectable
          ? 'filled'
          : 'outlined'
      "
      :text-center="true"
      :disabled="!item.selectable"
      allow-label-line-break
      @click.native="itemClicked(item)"
    />
  </div>
</template>
<script>
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'
import { useVariationmatrixStore } from '~/stores/product'
import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  components: {
    Button,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    attributeCode: {
      type: String,
      required: true,
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const { app } = useContext()
    const variationmatrixStore = useVariationmatrixStore()

    const itemClicked = async (item) => {
      await variationmatrixStore.toggleAttribute(
        props.attributeCode,
        item.value
      )
      if (!item.selected) {
        emit('selected')
      }
    }

    const isItemPreselected = (item) =>
      item.automaticallySelected && !item.selected

    const lang = computed(() => app.i18n?.locale || 'en')

    return {
      // Getters
      lang,

      // Actions
      itemClicked,
      isItemPreselected,
    }
  },
})
</script>

<style lang="scss" scoped>
.attribute-buttons {
  @apply tw-grid;
  @apply tw-grid-cols-2;
  grid-auto-rows: 1fr;
  @apply tw-gap-2;
  @apply tw-overflow-hidden;

  &--one-col {
    @apply tw-grid-cols-1;
  }

  &--three-cols {
    @screen lg {
      @apply tw-grid-cols-3;
    }
  }
}
</style>
