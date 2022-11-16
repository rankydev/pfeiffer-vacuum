import ProductInformation from '~/components/molecules/ProductInformation/ProductInformation.vue'
import {
  noProductInformation,
  withProductInformation,
} from '~/components/molecules/ProductInformation/ProductInformation.stories.content'

const argTypes = {
  product: {
    control: { type: 'array' },
    defaultValue: noProductInformation,
  },
}

export default {
  title: 'Molecules/m_n.N. Product Information',
  component: ProductInformation,
  parameters: {
    docs: {
      description: {
        component:
          'The product information that is visible on the product detail page.',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ProductInformation },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ProductInformation v-bind="args"/>
  </div>
`,
})

export const Without = Template.bind({})
Without.args = {
  product: noProductInformation,
}

export const With = Template.bind({})
With.args = {
  product: withProductInformation,
}
