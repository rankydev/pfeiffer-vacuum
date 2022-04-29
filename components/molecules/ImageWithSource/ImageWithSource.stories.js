import ImageWithSource from '~/components/molecules/ImageWithSource/ImageWithSource.vue'
import {
  aspectRatioOptions,
  imageWithSourceContent,
} from '/components/molecules/ImageWithSource/ImageWithSource.stories.content'

const argTypes = {
  image: {
    control: { type: 'object' },
    defaultValue: imageWithSourceContent.image.image,
  },
  description: {
    control: { type: 'array' },
    defaultValue: imageWithSourceContent.description,
  },
  aspectRatio: {
    options: aspectRatioOptions,
    defaultValue: imageWithSourceContent.aspectRatio,
    control: { type: 'radio' },
  },
}

export default {
  title: 'Molecules/Image With Source',
  component: ImageWithSource,
  parameters: {
    docs: {
      description: {
        component:
          'The Image with Source is used to place an image with selectable aspect ratio (f.e. 1:1, 16:9, 3:2). The space the image occupies on the page can also be handed into the component via props (f.e. 1/1, 1/4, 2/3 of the pages width).',
      },
      source: {
        code: '<ImageWithSource :v-bind="{ image, description, aspectRatio }" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ImageWithSource },
  setup() {
    return { args }
  },
  template: `<ImageWithSource v-bind="args"/>`,
})

export const Default = Template.bind({})
Default.args = {}
