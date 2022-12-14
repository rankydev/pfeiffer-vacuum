<template>
  <div class="attribute-buttons">
    <Button
      v-for="item in values"
      :key="item.value"
      :label="item.displayValue"
      :variant="item.selected ? 'secondary' : 'secondary'"
      :shape="item.selected ? 'filled' : 'outlined'"
      :disabled="!item.selectable"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Button from '~/components/atoms/Button/Button'

export default defineComponent({
  components: {
    Button,
  },
  props: {
    values: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    initialValue: {
      type: undefined,
      default: '',
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    let internalValue = ref(props.initialValue)

    const setActive = (val) => {
      internalValue.value = val
      emit('update', val)
    }

    return { internalValue, setActive }
  },
})
</script>
<style lang="scss">
.attribute-buttons {
  $root: &;

  @apply tw-grid tw-grid-cols-3;
  @apply tw-gap-2;
  @apply tw-overflow-hidden;
}
</style>
