import ImageWithSource from '~/components/molecules/ImageWithSource/ImageWithSource.vue'
import imageMock from './../../atoms/ResponsiveImage/ResponsiveImage.stories.content'
import { smallText } from '~/components/atoms/Richtext/Richtext.stories.content.js'
import { description } from '@nuxtjs/svg-sprite/lib/plugins/inlineDefs'

const argTypes = {
  image: {
    control: { type: 'object' },
    defaultValue: imageMock.image,
  },
  description: {
    control: { type: 'array' },
    defaultValue: [smallText],
  },
  format: {
    options: ['1:1', '16:9', '2:3', '3:2', '3:1'],
    control: { type: 'radio' },
  },
  imageWidth: {
    options: ['1/1', '1/4', '1/2', '1/3', '2/3'],
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
        code: '<ImageWithSource v-bind="{}" />',
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
