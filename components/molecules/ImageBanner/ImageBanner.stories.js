import ImageBanner from './ImageBanner.vue'
import {
  headline,
  subline,
  mediaImage,
  buttons,
  richtext,
} from './ImageBanner.stories.content.js'

const argTypes = {}

export default {
  title: 'Molecules/m_124 ImageBanner',
  component: ImageBanner,
  parameters: {
    docs: {
      description: {
        component:
          'The ImageBanner component is used to display an image along with some text. Above the text can a headline and a subline be defined. Below the text the editor has the posibility to add a button.',
      },
      source: {
        code: '<ImageBanner v-bind="{ headline, subline, buttons, richtext, image }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ImageBanner },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ImageBanner v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  headline,
  subline,
  image: mediaImage,
  buttons,
  richtext,
}
