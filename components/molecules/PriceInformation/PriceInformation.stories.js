import PriceInformation from '~/components/molecules/PriceInformation/PriceInformation.vue'
import {
  currentCartSpecificPrices,
  currentCartDelivery,
} from '~/components/molecules/PriceInformation/PriceInformation.stories.content'

export default {
  title: 'Molecules/m_143 PriceInformation',
  component: PriceInformation,
  parameters: {
    docs: {
      description: {
        component:
          'This component is intended to display further information about the price in the cart.',
      },
      source: {
        code: '<PriceInformation v-bind="{ currentCart }"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { PriceInformation },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <PriceInformation v-bind="args"/>
  </div>
`,
})

export const SpecificPrices = Template.bind({})
SpecificPrices.args = { currentCart: currentCartSpecificPrices }

export const Delivery = Template.bind({})
Delivery.args = { currentCart: currentCartDelivery }
