<template>
  <li class="multilevel-dropdown-node">
    <div class="multilevel-dropdown-node__item">
      <Checkbox
        :label="node[labelKey]"
        :checked="node[checkedKey]"
        @update="optionClicked(node)"
      />
      <Button
        v-if="hasChildren"
        :icon="expanded ? 'expand_less' : 'expand_more'"
        variant="variant-selection"
        shape="plain"
        @click="toggleIsExpanded"
      />
    </div>
    <ul v-if="hasChildren & expanded" class="multilevel-dropdown-node__child">
      <MultilevelDropdownNode
        v-for="child in children"
        :key="child[labelKey]"
        :node="child"
        :label-key="labelKey"
        :options-key="optionsKey"
        :checked-key="checkedKey"
        @optionClicked="optionClicked"
      />
    </ul>
  </li>
</template>

<script>
import { defineComponent, computed, ref, toRefs } from '@nuxtjs/composition-api'
import Checkbox from '@/components/atoms/FormComponents/Checkbox/Checkbox.vue'

export default defineComponent({
  name: 'MultilevelDropdownNode',
  components: { Checkbox },
  props: {
    node: {
      type: Object,
      required: true,
    },
    labelKey: {
      type: String,
      required: true,
    },
    optionsKey: {
      type: String,
      required: true,
    },
    checkedKey: {
      type: String,
      required: true,
    },
  },
  emits: ['optionClicked'],
  setup(props, { emit }) {
    const { node, optionsKey } = toRefs(props)

    const expanded = ref(false)

    const toggleIsExpanded = () => {
      expanded.value = !expanded.value
    }

    const children = computed(() => {
      return node.value[optionsKey.value] || []
    })

    const hasChildren = computed(() => {
      return children.value.length > 0
    })

    const optionClicked = (optionValue) => {
      emit('optionClicked', optionValue)
    }

    return {
      children,
      hasChildren,
      expanded,
      optionClicked,
      toggleIsExpanded,
    }
  },
})
</script>
