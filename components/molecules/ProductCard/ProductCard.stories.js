import ProductCard from '~/components/molecules/ProductCard/ProductCard.vue'
import { product as productData } from './ProductCard.stories.content'

const argTypes = {
  product: {
    control: { type: 'object' },
    defaultValue: productData,
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
          'The product card is a component which shows a product. The product is handed into the ProductCard by a parent component.',
      },
      source: {
        code: `<ProductCard v-bind="{ product }" />`,
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
