import ImageWithSource from '~/components/molecules/ImageWithSource/ImageWithSource.vue'
import imageMock from './../../atoms/ResponsiveImage/ResponsiveImage.stories.content'
import { description } from '../../atoms/VideoPlayer/VideoPlayer.stories.content'

const argTypes = {
  image: {
    control: { type: 'object' },
    defaultValue: imageMock.image,
  },
  description: {
    control: { type: 'object' },
    defaultValue: description,
  },
}

export default {
  title: 'Molecules/Image With Source',
  component: ImageWithSource,
  parameters: {
    docs: {
      description: {
        component: 'The Image with Source...',
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
