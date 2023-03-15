import KnowledgeStage from '~/components/molecules/KnowledgeStage/KnowledgeStage.vue'
import {
  image,
  date,
  isWhitePaper,
  minutes,
  hours,
  headline,
  summary,
} from './KnowledgeStage.stories.content'

const argTypes = {
  image: {
    defaultValue: image,
    control: { type: 'object' },
  },
  date: {
    defaultValue: date,
    control: { type: 'datetime' },
  },
  isWhitePaper: {
    defaultValue: isWhitePaper,
    control: { type: 'boolean' },
  },
  minutes: {
    defaultValue: minutes,
    control: { type: 'text' },
  },
  hours: {
    defaultValue: hours,
    control: { type: 'text' },
  },
  headline: {
    defaultValue: headline,
    control: { type: 'text' },
  },
  summary: {
    defaultValue: summary,
    control: { type: 'object' },
  },
}

export default {
  title: 'Molecules/m_135 Knowledge Stage',
  component: KnowledgeStage,
  parameters: {
    docs: {
      description: {
        component:
          'The Knowledge Stage can be used to display an appointment or a Whitepaper.',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args) => ({
  components: { KnowledgeStage },
  setup() {
    return {
      args,
    }
  },
  template: `
    <div class="documentation-preview">
    <KnowledgeStage v-bind="args"/>
    </div>
  `,
})

export const Default = Template.bind({})

export const Whitepaper = Template.bind({})
Whitepaper.args = { isWhitePaper: true }
