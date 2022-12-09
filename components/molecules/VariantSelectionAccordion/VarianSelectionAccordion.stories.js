import VariantSelectionAccordion from './VariantSelectionAccordion.vue'
import { variationMatrix } from '~/.storybook/mocks/variationMatrix'
import { useProductStore } from '~/stores/product'

const argTypes = {
  variationMatrix: {
    control: { type: 'array' },
    defaultValue: variationMatrix,
  },
}

export default {
  title: 'Molecules/m_132 Variant Selection Accordion',
  component: VariantSelectionAccordion,
  parameters: {
    docs: {
      description: {
        component:
          'The Recommended Accessories consists of an Accordion holding a Carousel of recommended Products for the displayed Product.',
      },
      source: {
        code: '<variant-selection-accordion v-bind="args" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: {
    VariantSelectionAccordion,
  },
  setup() {
    const productStore = useProductStore()
    productStore.variationMatrix = args.variationMatrix
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <variant-selection-accordion v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  variationMatrix: variationMatrix,
}
