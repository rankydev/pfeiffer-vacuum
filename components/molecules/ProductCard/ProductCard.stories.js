import ProductCard from '~/components/molecules/ProductCard/ProductCard.vue'
import {
  product,
  productWithVariants,
  productWithOrderNumber,
} from './ProductCard.stories.content'

const argTypes = {
  product: {
    control: { type: 'object' },
    defaultValue: product,
    table: { type: { summary: null } },
  },
}

export default {
  title: 'Molecules/m_106 Product-Card',
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
Default.args = {
  provider: 'hybris',
}

export const WithOrderNumber = Template.bind({})
WithOrderNumber.args = {
  provider: 'hybris',
  product: productWithOrderNumber,
}

export const WithVariants = Template.bind({})
WithVariants.args = {
  provider: 'hybris',
  product: productWithVariants,
}
