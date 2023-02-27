import ShoppingListItemCard from './ShoppingListItemCard'
import {
  product,
  basePrice,
  quantity,
} from './ShoppingListItemCard.stories.content'

const argTypes = {
  product,
  basePrice,
  quantity,
}

export default {
  title: 'Molecules/m_149 Shopping List Item Card',
  component: ShoppingListItemCard,
  parameters: {
    docs: {
      description: {
        component: 'Shopping List Item Card to be used in Shopping List Page',
      },
      source: {
        code: '<ShoppingListItemCard v-bind="{ product, basePrice, quantity }"/>',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ShoppingListItemCard },
  setup() {
    return { args }
  },
  template: `
    <div>
      <ShoppingListItemCard v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = argTypes
