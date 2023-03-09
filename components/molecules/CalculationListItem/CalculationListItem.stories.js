import CalculationListItem from './CalculationListItem.vue'
import { item, selectMode } from './CalculationListItem.stories.content.js'

const argTypes = {
  item,
  selectMode,
}

export default {
  title: 'Molecules/m_153 Calculation List Item',
  component: CalculationListItem,
  parameters: {
    docs: {
      description: {
        component: 'Shopping list item for shopping lists overview page.',
      },
      source: {
        code: '<CalculationListItem v-bind="args" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: {
    CalculationListItem,
  },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <CalculationListItem v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = argTypes
