import ProductCard from '~/components/molecules/ProductCard/ProductCard.vue'
import { productID } from './ProductCard.stories.content'

const argTypes = {
  productID: {
    control: { type: 'text' },
    defaultValue: productID,
    table: { type: { summary: null } },
  },
}

export default {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  parameters: {
    docs: {
      description: {
        component:
          'The product card is a component which can be used to display products from Hybris which are selected by productID.',
      },
      source: {
        code: `<ProductCard v-bind="{ productID }" />`,
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ProductCard },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview card-wrapper">
    <ProductCard v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})

Default.args = {}
