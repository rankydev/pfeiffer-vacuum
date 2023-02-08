import CartItemCard from './CartItemCard2'
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
        component: 'The Cart Item Card displays the items in the shopping cart',
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
PriceOnRequest.args = {
  entry,
  price,
  readOnly: true,
  shopAttributes,
  appliedOrderPromotions,
  showPrice: false,
}

export const HasNoPrice = Template.bind({})
HasNoPrice.args = {
  entry,
  price: null,
  readOnly: true,
  shopAttributes,
  appliedOrderPromotions,
  showPrice: true,
}
