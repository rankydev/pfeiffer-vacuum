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
          'The generic card is an abstract component which can be used to define the different card components like product card or blog card.',
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
