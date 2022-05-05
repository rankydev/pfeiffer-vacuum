import ContentMediaBlock from './ContentMediaBlock.vue'
import {
  headline,
  subline,
  mediaVideo,
  mediaImage,
  order,
  orders,
  ratio,
  ratios,
  buttons,
  richtext,
} from './ContentMediaBlock.stories.content.js'

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
  title: 'Organisms/ContentMediaBlock',
  component: ContentMediaBlock,
  parameters: {
    docs: {
      description: {
        component:
          'The ContentMediaBlock component is used to display a video along with come text. Above the text can a headline and a subline be defined. Below the text the editor has the posibility to add up to 2 buttons.',
      },
      source: {
        code: '<ContentMediaBlock v-bind="{ headline, subline, media, order, ratio, buttons, richtext }"  />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ContentMediaBlock },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ContentMediaBlock v-bind="args" />
  </div>
`,
})

export const Video = Template.bind({})
Video.args = {
  headline,
  subline,
  media: mediaVideo,
  order,
  ratio,
  buttons,
  richtext,
}

export const Image = Template.bind({})
Image.args = {
  headline,
  subline,
  media: mediaImage,
  order,
  ratio,
  buttons,
  richtext,
}
