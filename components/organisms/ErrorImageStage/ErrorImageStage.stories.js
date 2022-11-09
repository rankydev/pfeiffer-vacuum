import ErrorImageStage from './ErrorImageStage.vue'
import { errorStageContent } from './ErrorImageStage.stories.content'

const argTypes = {
  stageContent: {
    control: { type: 'object' },
    defaultValue: errorStageContent.stageContent,
  },
  image: {
    control: { type: 'object' },
    defaultValue: errorStageContent.image,
  },
  interlay: {
    control: { type: 'object' },
    defaultValue: errorStageContent.interlay,
  },
}

export default {
  title: 'Organisms/o_115 Error Image Stage Module',
  component: ErrorImageStage,
  parameters: {
    docs: {
      description: {
        component:
          'ErrorImageStage component used as the stage of the errorpages (e.g. 404).',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes: types }) => ({
  components: { ErrorImageStage },
  props: Object.keys(types),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <ErrorImageStage v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
