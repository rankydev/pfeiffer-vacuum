import InformationBox from './InformationBox'
import { content } from './InformationBox.stories.content.js'

const argTypes = {}

export default {
  title: 'Technical Components/InformationBox',
  component: InformationBox,
  parameters: {
    docs: {
      description: {
        component: 'This component displays account or company data',
      },
      source: {
        code: '<InformationBox v-bind="{ content }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { InformationBox },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview" style="max-width:50%">
    <InformationBox v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  content,
}
