import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'
import ResponsiveImageContent from './ResponsiveImage.stories.content.js'
import { aspectRatioOptions } from '~/components/molecules/ImageWithDescription/ImageWithDescription.stories.content'

const argTypes = {
  image: {
    control: { type: 'array' },
    defaultValue: ResponsiveImageContent.image,
  },
  withGradient: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  blackAndWhite: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  lazy: {
    control: { type: 'boolean' },
  },
  rounded: {
    control: { type: 'boolean' },
  },
  provider: {
    defaultValue: 'storyblok',
  },
  aspectRatio: {
    options: aspectRatioOptions,
    control: { type: 'radio' },
  },
}

export default {
  title: 'Technical Components/Responsive Image',
  component: ResponsiveImage,
  parameters: {
    docs: {
      description: {
        component:
          'This component will render an Image that is handed in from parent component or show a placeholder if the image is not available.',
      },
      source: {
        code: '<ResponsiveImage v-bind="{ image, withGradient, blackAndWhite, lazy, provider, aspectRatio }" />',
      },
    },
  },
  argTypes,
}

const Template = (args) => ({
  components: { ResponsiveImage },
  setup() {
    return { args }
  },
  template: `<ResponsiveImage v-bind="args" />`,
})

export const Default = Template.bind({})
Default.args = {}
