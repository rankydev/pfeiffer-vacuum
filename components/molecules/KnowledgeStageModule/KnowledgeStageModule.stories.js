import KnowledgeStageModule from './KnowledgeStageModule.vue'
import {
  headline,
  mediaImage,
  order,
  orders,
  buttons,
  richtext,
} from './KnowledgeStageModule.stories.content.js'

const argTypes = {
  ratio: {
    options: ratios,
    control: { type: 'inline-radio' },
  },
  order: {
    options: orders,
    control: { type: 'inline-radio' },
  },
}

export default {
  title: 'Organisms/o_200 Knowledge Stage Module',
  component: KnowledgeStageModule,
  parameters: {
    docs: {
      description: {
        component:
          'The KnowledgeStageModule component is used to display an image along with come text. Above the text can a headline and a subline be defined. Below the text the editor has the posibility to add up to 2 buttons.',
      },
      source: {
        code: '<KnowledgeStageModule v-bind="{ headline, subline, media, order, ratio, buttons, richtext }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { KnowledgeStageModule },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <KnowledgeStageModule v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  headline,
  subline,
  media: mediaImage,
  order,
  ratio,
  buttons,
  richtext,
}
