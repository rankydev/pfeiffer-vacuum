<template>
  <ul class="multilevel-dropdown">
    <MultilevelDropdownNode
      v-for="node in options"
      :key="node[labelKey]"
      :node="node"
      :label-key="labelKey"
      :options-key="optionsKey"
      :checked-key="checkedKey"
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
    labelKey: {
      type: String,
      default: 'label',
    },
    optionsKey: {
      type: String,
      default: 'concepts',
    },
    checkedKey: {
      type: String,
      default: 'checked',
    },
  },
  emits: ['update'],
  setup(_, { emit }) {
    const clickedOption = (option) => {
      emit('update', option)
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
    input {
      @apply focus:tw-border-pv-red-lighter;
    }
  }

  .button {
    @apply tw-p-0;
  }

  &-node {
    &__item {
      @apply tw-flex;
      @apply tw-gap-3;
    }

    &__checkbox {
      .checkbox__input {
        flex: 0 0 24px;
      }
    }

    &__expand {
      flex: 0 0 24px;
    }

    &__child {
      li:first-child {
        @apply tw-pt-3;
      }
    }
  }
}
</style>
