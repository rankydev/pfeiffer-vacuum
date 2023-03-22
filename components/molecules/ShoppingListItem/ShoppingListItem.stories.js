import ShoppingListItem from './ShoppingListItem.vue'
import {
  lists,
  selectMode,
} from '~/components/molecules/ShoppingListTable/ShoppingListTable.stories.content'

const argTypes = {
  list: lists[0],
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
    <ShoppingListItem v-bind="args"/>
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = argTypes
