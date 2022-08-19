import HelpContainer from './HelpContainer.vue'
import {
  headline,
  subline,
  icon,
  buttons,
  richtext,
} from './HelpContainer.stories.content.js'

const argTypes = {}

export default {
  title: 'Molecules/m_118 HelpContainer',
  component: HelpContainer,
  parameters: {
    docs: {
      description: {
        component:
          'The HelpContainer component is used to display an questionmark-icon on red background along with some text. Above the text can a headline and a subline be defined. Below the text the editor has the possibility to add a button.',
      },
      source: {
        code: '<HelpContainer v-bind="{ headline, subline, icon, buttons, richtext }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { HelpContainer },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <HelpContainer v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  headline,
  subline,
  icon,
  buttons,
  richtext,
}
