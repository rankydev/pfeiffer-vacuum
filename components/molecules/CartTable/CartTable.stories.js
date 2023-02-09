import CartTable from './CartTable'

const argTypes = {}

export default {
  title: 'Molecules/m_146 Cart Table',
  component: CartTable,
  parameters: {
    docs: {
      description: {
        component: 'The Cart Item Card displays the items in the shopping cart',
      },
      source: {
        appliedOrderPromotions,
        code: '<cart-table />',
      },
    },
  },
  argTypes,
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
Default.args = argTypes
