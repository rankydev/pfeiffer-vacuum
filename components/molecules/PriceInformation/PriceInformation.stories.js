import PriceInformation from '~/components/molecules/PriceInformation/PriceInformation.vue'
import { informationType } from '~/components/molecules/PriceInformation/PriceInformation.stories.content'

export default {
  title: 'Molecules/m_145 PriceInformation',
  component: PriceInformation,
  parameters: {
    docs: {
      description: {
        component:
          'This component is intended to display further price or delivery information in the cart. The content is based on the prop "informationType". Provide a valid informationType to display the correct information. Valid types are: "price" and "delivery"',
      },
    },
  },
}

const Template = (args) => ({
  components: { PriceInformation },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <PriceInformation v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})

Default.args = { informationType }
