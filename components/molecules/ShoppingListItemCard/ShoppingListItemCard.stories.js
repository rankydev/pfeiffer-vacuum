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
  promotion: appliedOrderPromotion,
}

export default {
  title: 'Molecules/m_144 Shopping List Item Card',
  component: ShoppingListItemCard,
  parameters: {
    docs: {
      description: {
        component: 'The Cart Item Card displays the items in the shopping cart',
      },
      source: {
        appliedOrderPromotion,
        code: '<ShoppingListItemCard v-bind="{ entry, readOnly, price, shopAttributes, promotions, showPrice }"/>',
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
