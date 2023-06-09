import ImageWithDescription from './ImageWithDescription.vue'
import {
  aspectRatioOptions,
  imageWithDescriptionContent,
} from './ImageWithDescription.stories.content'

const argTypes = {
  image: {
    control: { type: 'object' },
    defaultValue: imageWithDescriptionContent.image,
  },
  description: {
    control: { type: 'array' },
    defaultValue: imageWithDescriptionContent.description,
  },
  aspectRatio: {
    options: aspectRatioOptions,
    defaultValue: imageWithDescriptionContent.aspectRatio,
    control: { type: 'radio' },
  },
}

export default {
  title: 'Molecules/m_116 Image Module with source',
  component: ImageWithDescription,
  parameters: {
    docs: {
      description: {
        component:
          'The Image module with source is used to place an image with selectable aspect ratio (f.e. 1:1, 16:9, 3:2). The space the image occupies on the page can also be handed into the component via props (f.e. 1/1, 1/4, 2/3 of the pages width).',
      },
      source: {
        code: '<ImageWithDescription :v-bind="{ image, description, aspectRatio }" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ImageWithDescription },
  setup() {
    return { args }
  },
  template: `
    <ImageWithDescription v-bind="args"/>`,
})

export const Default = Template.bind({})
Default.args = {}
