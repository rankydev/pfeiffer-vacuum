import CartTable from './CartTable'
import { cart } from './CartTable.stories.content'
export default {
  title: 'Molecules/m_146 Cart Table',
  component: CartTable,
  parameters: {
    docs: {
      description: {
        component: 'The Cart Table displays the items in the shopping cart',
      },
      source: {
        code: '<cart-table v-bind="{cart}" />',
      },
    },
  },
  cart,
}

const Template = (args) => ({
  components: { CartTable },
  setup() {
    return { args }
  },
  template: `
    <div>
      <cart-table v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  cart,
  isMiniCart: false,
}
