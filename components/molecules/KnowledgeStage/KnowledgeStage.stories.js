import KnowledgeStage from '~/components/molecules/KnowledgeStage/KnowledgeStage.vue'
import StageContent from './KnowledgeStage.stories.content'

const argTypes = {
  image: {
    defaultValue: StageContent.image,
    control: { type: 'object' },
  },
  stageContent: {
    defaultValue: StageContent.stageContent,
    control: { type: 'array' },
  },
}

export default {
  title: 'Molecules/m_200 KnowledgeStage Module',
  component: KnowledgeStage,
  parameters: {
    docs: {
      description: {
        component: 'The stage component, nesting the stage-content component.',
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

export const ImageOnly = Template.bind({})
ImageOnly.args = { stageContent: [] }
