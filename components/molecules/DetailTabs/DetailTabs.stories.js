import DetailTabs from './DetailTabs'
import { product } from '~/.storybook/mocks/product'
import { useProductStore } from '~/stores/product'

const argTypes = {
  product: {
    control: { type: 'array' },
    defaultValue: product,
  },
}

export default {
  title: 'Molecules/m_129 Detail Tabs',
  component: DetailTabs,
  parameters: {
    docs: {
      description: {
        component:
          'The Detail Tabs is used on the product page to show some tabs with further informations for the product. ',
      },
      source: {
        code: '<detail-tabs :product="productStore.product" :product-code="productStore.code"/>',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { DetailTabs },
  setup() {
    const productStore = useProductStore()
    productStore.product = args.product
    return { args }
  },
  template: `
    <div>
      <detail-tabs v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {
  product: product,
}
