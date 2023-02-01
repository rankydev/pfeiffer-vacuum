import CartItemCard from './CartItemCard'
import {
  entry,
  readOnly,
  price,
  shopAttributes,
  appliedOrderPromotions,
} from './CartItemCard.stories.content'

const argTypes = {
  entry: entry,
  readOnly: readOnly,
  price: price,
  shopAttributes: shopAttributes,
  promotions: appliedOrderPromotions,
}

export default {
  title: 'Molecules/m_XYZ Cart Item Card',
  component: CartItemCard,
  parameters: {
    docs: {
      description: {
        component: '',
      },
      source: {
        code: '<cart-item-card v-bind="{ entry, readOnly, price, shopAttributes }"/>',
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
