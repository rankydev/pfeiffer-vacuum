import ProductTechnicalData from '~/components/molecules/ProductTechnicalData/ProductTechnicalData.vue'
import { features } from '~/components/molecules/ProductTechnicalData/ProductTechnicalData.stories.content'

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
        component: 'The language switcher element to adjust the shop language',
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
