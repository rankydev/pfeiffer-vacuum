<template>
  <ul class="multilevel-dropdown">
    <MultilevelDropdownNode
      v-for="node in options"
      :key="node[optionLabel]"
      :node="node"
      :option-label="optionLabel"
      :options-key="optionsKey"
    />
  </ul>
</template>

<script>
import { defineComponent, ref, provide, watch } from '@nuxtjs/composition-api'
import MultilevelDropdownNode from './MultilevelDropdownNode'

export default defineComponent({
  name: 'MultilevelDropdown',
  components: {
    MultilevelDropdownNode,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    optionLabel: {
      type: String,
      default: 'label',
      required: false,
    },
    optionsKey: {
      type: String,
      default: 'concepts',
      required: false,
    },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const selectedArray = ref([])
    provide('selectedArray', selectedArray)
    watch(selectedArray, () => {
      emit('update', selectedArray.value)
    })
  },
})
</script>

<style lang="scss">
.multilevel-dropdown {
  ul {
    padding-left: 10px;
  }

  li {
    padding-top: 12px;

    &:first-child {
      padding-top: 0;
    }
  }

  .button {
    padding: 0;
    margin: auto 0 auto 8px;
  }

  &-node-item {
    display: flex;
  }

  &-node-child {
    li:first-child {
      padding-top: 12px;
    }
  }
}
</style>
