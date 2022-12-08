import RecommendedAccessories from './RecommendedAccessories.vue'
import { product } from '~/.storybook/mocks/product'
import { useProductStore } from '~/stores/product'

const argTypes = {
  headline: {
    control: { type: 'String' },
    defaultValue: 'Recommended Accessories for Product',
  },
  product: {
    control: { type: 'array' },
    defaultValue: product,
  },
}

export default {
  title: 'Organisms/o_119 Recommended Accessories',
  component: RecommendedAccessories,
  parameters: {
    docs: {
      description: {
        component:
          'The Recommended Accessories consists of an Accordion holding a Carousel of recommended Products for the displayed Product.',
      },
      source: {
        code: '<recommended-accessories :headline="productStore.product.name" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: {
    RecommendedAccessories,
  },
  setup() {
    const productStore = useProductStore()
    productStore.product = args.product
    return { args }
  },
  template: `
  <recommended-accessories v-bind="args" />
`,
})

export const Default = Template.bind({})
Default.args = {
  product: product,
}
