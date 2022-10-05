import SearchResult from '~/components/organisms/SearchResult/SearchResult.vue'
import { products, pagination } from './SearchResult.stories.content.js'
import {
  productWithOrderNumber,
  productWithVariants,
} from '../../molecules/ProductCard/ProductCard.stories.content'
import categories from '~/components/molecules/CategoryTree/CategoryTree.stories.content'

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
  title: 'Organisms/o_116 SearchResult',
  component: SearchResult,
  parameters: {
    docs: {
      description: {
        component: 'The category page of the application',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { SearchResult },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <SearchResult v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  products,
  pagination,
  categories,
}
