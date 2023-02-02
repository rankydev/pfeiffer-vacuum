<template>
  <li class="multilevel-dropdown-node">
    <div class="multilevel-dropdown-node__item">
      <Checkbox
        :label="node[optionLabel]"
        :checked="isChecked"
        @update="onUpdateCheckBox"
      />
      <Button
        v-if="hasChildren"
        :icon="isExpanded ? 'expand_less' : 'expand_more'"
        variant="variant-selection"
        shape="plain"
        @click="toggleIsExpanded"
      />
    </div>
    <ul
      v-if="hasChildren"
      v-show="isExpanded"
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
import { computed, defineComponent, inject, ref } from '@nuxtjs/composition-api'
import Checkbox from '~/components/atoms/FormComponents/Checkbox/Checkbox.vue'

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
    const isExpanded = ref(props.expanded)
    const isChecked = ref(props.checked)
    const selectedArray = inject('selectedArray')
    const children = computed(() => {
      return props.node[props.optionsKey] || []
    })
    const hasChildren = computed(() => {
      return children.value.length > 0
    })
    const toggleIsExpanded = () => {
      isExpanded.value = !isExpanded.value
    }
    const updateSelectedArray = () => {
      if (isChecked.value) {
        selectedArray.value.push(props.node)
      } else {
        selectedArray.value = selectedArray.value.filter(
          (item) => item !== props.node
        )
      }
    }
    const onUpdateCheckBox = (checked) => {
      isChecked.value = checked
      updateSelectedArray()
    }

    return {
      children,
      isChecked,
      onUpdateCheckBox,
      hasChildren,
      isExpanded,
      toggleIsExpanded,
    }
  },
})
</script>
