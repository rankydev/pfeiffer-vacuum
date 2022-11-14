import DetailTabs from './DetailTabs'
import categories from './DetailTabs.stories.content'

const argTypes = {
  categories,
}

export default {
  title: 'Molecules/m_129 Detail Tabs',
  component: DetailTabs,
  parameters: {
    docs: {
      description: {
        component:
          'The DetailTabs is used on the product page to show some tabs with further informations for the product. ',
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
    return { args }
  },
  template: `
    <div>
      <detail-tabs v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
