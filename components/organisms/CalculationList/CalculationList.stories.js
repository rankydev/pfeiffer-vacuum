import CalculationList from './CalculationList.vue'
import { lists, selectMode } from './CalculationList.stories.content.js'

const argTypes = {
  lists,
  selectMode,
}

export default {
  title: 'Organisms/o_120 Calculation List',
  component: CalculationList,
  parameters: {
    docs: {
      description: {
        component: 'Calculation list table for calculations overview page',
      },
      source: {
        code: '<CalculationList v-bind="args" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: {
    CalculationList,
  },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <CalculationList v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = argTypes
