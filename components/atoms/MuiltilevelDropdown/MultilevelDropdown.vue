<template>
  <ul class="multilevel-dropdown">
    <MultilevelDropdownNode
      v-for="node in options"
      :key="node[optionLabel]"
      :node="node"
      :option-label="optionLabel"
      :options-key="optionsKey"
      :value-key="valueKey"
      @optionClicked="clickedOption"
    />
  </ul>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import MultilevelDropdownNode from './MultilevelDropdownNode.vue'

export default defineComponent({
  name: 'MultilevelDropdown',
  components: {
    MultilevelDropdownNode,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    optionLabel: {
      type: String,
      default: 'label',
    },
    optionsKey: {
      type: String,
      default: 'concepts',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
  },
  emits: ['update'],
  setup(_, { emit }) {
    const clickedOption = (optionValue) => {
      emit('update', optionValue)
    }

    return {
      clickedOption,
    }
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

  .checkbox {
    @apply tw-min-w-fit;

    input {
      @apply focus:tw-border-pv-red-lighter;
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
