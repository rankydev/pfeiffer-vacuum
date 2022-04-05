import ImageWithSource from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'
import imageMock from './ResponsiveImage.stories.content.js'

const argTypes = {
  image: {
    control: { type: 'array' },
    defaultValue: imageMock.image,
  },
  withGradient: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  blackAndWhite: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  defaultSize: {
    control: { type: 'object' },
    defaultValue: imageMock.defaultSize,
  },
  sizes: {
    control: { type: 'object' },
  },
  imgStyle: {
    control: { type: 'object' },
  },
  lazy: {
    control: { type: 'boolean' },
  },
}

export default {
  title: 'Atoms/Responsive Image',
  component: ImageWithSource,
  parameters: {
    docs: {
      description: {
        component: '',
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
  template: `<ImageWithSource v-bind="args" />`,
})

export const Default = Template.bind({})
Default.args = {}
