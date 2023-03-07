import ShoppingListItem from './ShoppingListItem.vue'
import { list, selectMode } from './ShoppingListItem.stories.content.js'

const argTypes = {
  list,
  selectMode,
}

export default {
  title: 'Molecules/m_151 Shopping List Item',
  component: ShoppingListItem,
  parameters: {
    docs: {
      description: {
        component: 'Shopping list item for shopping lists overview page.',
      },
      source: {
        code: '<ShoppingListItem v-bind="args" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: {
    ShoppingListItem,
  },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ShoppingListItem v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = argTypes
