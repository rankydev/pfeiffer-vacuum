import ShoppingListItemCard from './ShoppingListItemCard'
import {
  product,
  price,
  appliedOrderPromotion,
  quantity,
} from './ShoppingListItemCard.stories.content'

const argTypes = {
  product,
  price,
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
        appliedOrderPromotion,
        code: '<ShoppingListItemCard v-bind="{ product, price, quantity }"/>',
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
