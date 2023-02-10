import CartItemCard from './CartItemCard'
import {
  product,
  price,
  appliedOrderPromotion,
  quantity,
} from './CartItemCard.stories.content'

const argTypes = {
  product,
  price,
  quantity,
  promotion: appliedOrderPromotion,
}

export default {
  title: 'Molecules/m_144 Cart Item Card',
  component: CartItemCard,
  parameters: {
    docs: {
      description: {
        component: 'The Cart Item Card displays the items in the shopping cart',
      },
      source: {
        appliedOrderPromotion,
        code: '<cart-item-card v-bind="{ entry, readOnly, price, shopAttributes, promotions, showPrice }"/>',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { CartItemCard },
  setup() {
    return { args }
  },
  template: `
    <div>
      <cart-item-card v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = argTypes
