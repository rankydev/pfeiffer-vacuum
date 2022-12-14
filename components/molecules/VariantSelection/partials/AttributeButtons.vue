<template>
  <div class="wrapper">
    <div v-for="(group, index) of [items]" :key="index">
      <div
        class="attribute-buttons"
        :class="{ 'attribute-buttons--two-cols': group.length <= 2 }"
      >
        <Button
          v-for="item in group"
          :key="item.value"
          :label="item.displayValue"
          :variant="item.selected ? 'secondary' : 'secondary'"
          :shape="item.selected ? 'filled' : 'outlined'"
          :disabled="!item.selectable"
          @click.native="itemClicked(item)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
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

    const { items } = toRefs(props)

    const selectableValues = items.value.filter((item) => {
      return item.selectable
    })

    const notSelectableValues = items.value.filter((item) => {
      return !item.selectable
    })

    return { itemClicked, selectableValues, notSelectableValues }
  },
})
</script>

<style lang="scss" scoped>
.attribute-buttons {
  @apply tw-grid;
  @apply tw-grid-cols-3;
  grid-auto-rows: 1fr;
  @apply tw-gap-2;
  @apply tw-overflow-hidden;

  &--two-cols {
    @apply tw-grid-cols-2;
  }
}
</style>
