import CartItemCard from './CartItemCard'
import {
  entry,
  price,
  readOnly,
  shopAttributes,
  appliedOrderPromotions,
  showPrice,
} from './CartItemCard.stories.content'

const argTypes = {
  entry: entry,
  readOnly: readOnly,
  price: price,
  shopAttributes: shopAttributes,
  promotions: appliedOrderPromotions,
  showPrice: showPrice,
}

export default {
  title: 'Molecules/m_144 Cart Item Card',
  component: CartItemCard,
  parameters: {
    docs: {
      description: {
        component: '',
      },
      source: {
        appliedOrderPromotions,
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

export const PriceOnRequest = Template.bind({})
Default.args = {
  entry,
  price: false,
  readOnly,
  shopAttributes,
  appliedOrderPromotions,
  showPrice,
}
