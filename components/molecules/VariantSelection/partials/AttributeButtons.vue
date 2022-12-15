<template>
  <div
    class="attribute-buttons"
    :class="{ 'attribute-buttons--three-cols': items.length > 2 }"
  >
    <Button
      v-for="item in items"
      :key="item.value"
      :label="item.displayValue"
      :variant="
        item.preselected ? 'variant-selection-preselected' : 'variant-selection'
      "
      :shape="item.selected || !item.selectable ? 'filled' : 'outlined'"
      :disabled="!item.selectable"
      allow-label-line-break
      @click.native="itemClicked(item)"
    />
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
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
  },
  emits: ['item-clicked'],
  setup(props, { emit }) {
    const itemClicked = (val) => {
      emit('item-clicked', val)
    }

    return { itemClicked }
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

  &--three-cols {
    @screen md {
      @apply tw-grid-cols-3;
    }
  }
}
</style>
