import Stage from '~/components/molecules/Stage/Stage.vue'
import StageContent from './Stage.stories.content'

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
  title: 'Molecules/Stage Module',
  component: Stage,
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
  components: { Stage },
  setup() {
    return {
      args,
    }
  },
  template: `
  <div class="documentation-preview">
    <Stage v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})

export const ImageOnly = Template.bind({})
ImageOnly.args = { stageContent: [] }
