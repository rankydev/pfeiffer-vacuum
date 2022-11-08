import ProductCardGrid from './ProductCardGrid.vue'
import {
  productWithOrderNumber,
  productWithVariants,
} from '../../molecules/ProductCard/ProductCard.stories.content'

const argTypes = {
  products: {
    control: { type: 'array' },
    defaultValue: [
      productWithOrderNumber,
      productWithVariants,
      productWithOrderNumber,
      productWithVariants,
      productWithOrderNumber,
      productWithVariants,
      productWithOrderNumber,
      productWithVariants,
      productWithOrderNumber,
    ],
  },
}

export default {
  title: 'Technical Components/Product Card Grid',
  component: ProductCardGrid,
  parameters: {
    docs: {
      description: {
        component:
          'Grid component rendering the product cards in a grid, based on product codes maintained in Storyblok.',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args, { types }) => ({
  components: { ProductCardGrid },
  props: Object.keys(types),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <ProductCardGrid v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
