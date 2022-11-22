import ProductTechnicalData from './ProductTechnicalData'
import { features } from './ProductTechnicalData.stories.content'

const argTypes = {
  features: {
    control: { type: 'array' },
    defaultValue: features,
  },
}

export default {
  title: 'Molecules/m_n.N. Product Technical Data',
  component: ProductTechnicalData,
  parameters: {
    docs: {
      description: {
        component:
          'The technical data that is visible on the product detail page.',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ProductTechnicalData },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ProductTechnicalData v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
