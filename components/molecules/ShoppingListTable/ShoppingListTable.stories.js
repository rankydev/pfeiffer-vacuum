import ShoppingListTable from './ShoppingListTable.vue'
import { lists, selectMode } from './ShoppingListTable.stories.content.js'

const argTypes = {
  lists,
  selectMode,
}

export default {
  title: 'Molecules/m_152 Shopping List Table',
  component: ShoppingListTable,
  parameters: {
    docs: {
      description: {
        component: 'Shopping List Table for shopping lists overview page',
      },
      source: {
        code: '<ShoppingListTable v-bind="args" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: {
    ShoppingListTable,
  },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ShoppingListTable v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = argTypes
