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
import { defineComponent, provide, ref, watch } from '@nuxtjs/composition-api'
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
    @apply tw-pl-2.5;
  }

  li {
    @apply tw-pt-3;

    &:first-child {
      @apply tw-pt-0;
    }
  }

  .button {
    @apply tw-p-0;
    @apply tw-my-auto;
    @apply tw-ml-2;
  }

  &-node {
    &__item {
      @apply tw-flex;
    }

    &__child {
      li:first-child {
        @apply tw-pt-3;
      }
    }
  }
}
</style>
