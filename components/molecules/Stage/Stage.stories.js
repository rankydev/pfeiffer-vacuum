import Stage from '~/components/molecules/Stage/Stage.vue'
import StageContent from './Stage.stories.content'
import { variants, imagePositions } from './Stage.stories.content'

const argTypes = {
  variant: {
    defaultValue: StageContent.variant,
    options: variants,
    control: { type: 'inline-radio' },
  },
  image: {
    defaultValue: StageContent.image,
    control: { type: 'object' },
  },
  imagePosition: {
    defaultValue: StageContent.imagePosition,
    options: imagePositions,
    control: { type: 'inline-radio' },
  },
  stageContent: {
    defaultValue: StageContent.stageContent,
    control: { type: 'array' },
  },
}

export default {
  title: 'Molecules/Stage',
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
