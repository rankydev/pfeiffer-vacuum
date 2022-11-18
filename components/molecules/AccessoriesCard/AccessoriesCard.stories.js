import AccessoriesCard from './AccessoriesCard'
import { product } from '~/components/molecules/ProductCard/ProductCard.stories.content'

const argTypes = {
  product: product,
  provider: {
    defaultValue: 'storyblok',
  },
}

export default {
  title: 'Molecules/m_131 Accessories Card',
  component: AccessoriesCard,
  parameters: {
    docs: {
      description: {
        component:
          'The AccessoriesCard is used on the product page to show some complementing products for the displayed product. The Accessoiries Card will be used in a carousel . ',
      },
      source: {
        code: '<detail-tabs :product="productStore.product" :provider="provider" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { AccessoriesCard },
  setup() {
    return { args }
  },
  template: `
    <div>
      <accessories-card v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  product: product,
  provider: 'storyblok',
}
