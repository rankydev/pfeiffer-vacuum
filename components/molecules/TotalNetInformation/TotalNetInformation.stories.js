import TotalNetInformation from '~/components/molecules/TotalNetInformation/TotalNetInformation.vue'
import { currentCart } from '~/components/molecules/TotalNetInformation/TotalNetInformation.stories.content'

export default {
  title: 'Molecules/m_142 TotalNetInformation',
  component: TotalNetInformation,
  parameters: {
    docs: {
      description: {
        component:
          'This component is intended to display the current price of the cart or show a message if a user is not yet logged in',
      },
      source: {
        code: '<TotalNetInformation v-bind="{ currentCart }"  />',
      },
    },
  },
}

const Template = (args) => ({
  components: { TotalNetInformation },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <TotalNetInformation v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = { currentCart }
