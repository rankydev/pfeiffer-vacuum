import ErrorImageTeaser from './ErrorImageTeaser.vue'
import { errorTeaserContent } from './ErrorImageTeaser.stories.content'

const argTypes = {
  stageContent: {
    control: { type: 'object' },
    defaultValue: errorTeaserContent.stageContent,
  },
  image: {
    control: { type: 'object' },
    defaultValue: errorTeaserContent.image,
  },
  interlay: {
    control: { type: 'object' },
    defaultValue: errorTeaserContent.interlay,
  },
}

export default {
  title: 'Organisms/o_115 Error Image Teaser Module',
  component: ErrorImageTeaser,
  parameters: {
    docs: {
      description: {
        component:
          'ErrorImageTeaser component used as the stage of the errorpage.',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { ErrorImageTeaser },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <ErrorImageTeaser v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
