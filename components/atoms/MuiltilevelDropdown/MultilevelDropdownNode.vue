<template>
  <li class="multilevel-dropdown-node">
    <div class="multilevel-dropdown-node__item">
      <Checkbox
        :label="node[optionLabel]"
        :checked="getChecked"
        @update="onUpdateCheckBox"
      />
      <Button
        v-if="hasChildren"
        :icon="getExpanded ? 'expand_less' : 'expand_more'"
        variant="variant-selection"
        shape="plain"
        @click="toggleIsExpanded"
      />
    </div>
    <ul
      v-if="hasChildren"
      v-show="getExpanded"
      class="multilevel-dropdown-node__child"
    >
      <MultilevelDropdownNode
        v-for="child in children"
        :key="child.label"
        :node="child"
        :option-label="optionLabel"
        :options-key="optionsKey"
      />
    </ul>
  </li>
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
  toRefs,
} from '@nuxtjs/composition-api'
import Checkbox from '@/components/atoms/FormComponents/Checkbox/Checkbox.vue'

export default defineComponent({
  name: 'MultilevelDropdownNode',
  components: { Checkbox },
  props: {
    node: {
      type: Object,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
      required: false,
    },
    checked: {
      type: Boolean,
      default: false,
      required: false,
    },
    optionLabel: {
      type: String,
      required: true,
    },
    optionsKey: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { checked, expanded, node, optionsKey } = toRefs(props)
    const selectedArray = inject('selectedArray')
    const children = computed(() => {
      return node.value[optionsKey.value] || []
    })
    const hasChildren = computed(() => {
      return children.value.length > 0
    })
    const toggleIsExpanded = () => {
      expanded.value = !expanded.value
    }
    const updateSelectedArray = () => {
      if (checked.value) {
        selectedArray.value.push(node.value)
      } else {
        selectedArray.value = selectedArray.value.filter(
          (item) => item !== node.value
        )
      }
    }
    const onUpdateCheckBox = (checkedValue) => {
      checked.value = checkedValue
      updateSelectedArray()
    }

    const getChecked = computed(() => {
      return checked.value
    })

    const getExpanded = computed(() => {
      return expanded.value
    })

    return {
      children,
      getChecked,
      onUpdateCheckBox,
      hasChildren,
      getExpanded,
      toggleIsExpanded,
    }
  },
})
</script>
