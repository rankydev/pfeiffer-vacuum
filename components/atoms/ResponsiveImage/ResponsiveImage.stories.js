import ResponsiveImage from '~/components/atoms/ResponsiveImage/ResponsiveImage.vue'
import ResponsiveImageContent from './ResponsiveImage.stories.content.js'
import Icon from '~/components/atoms/Icon/Icon'

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
  defaultSize: {
    control: { type: 'object' },
    defaultValue: ResponsiveImageContent.defaultSize,
  },
  sizes: {
    control: { type: 'object' },
    defaultValue: [
      { media: 'xl', height: '360px', width: '360px' },
      { media: 'lg', height: '256px', width: '256px' },
      { media: 'md', height: '192px', width: '192px' },
      { media: 's', height: '320px', width: '320px' },
    ],
  },
  // sizes: {
  //   defaultValue: [
  //     { media: 'xl', height: '360px', width: '360px' },
  //     { media: 'lg', height: '256px', width: '256px' },
  //     { media: 'md', height: '192px', width: '192px' },
  //     { media: 's', height: '320px', width: '320px' },
  //   ],
  // },
  lazy: {
    control: { type: 'boolean' },
  },
  provider: {
    defaultValue: 'storyblok',
  },
  aspectRatio: {
    options: ['1:1', '16:9', '2:3', '3:2', '3:1'],
    control: { type: 'radio' },
  },
}

export default {
  title: 'Atoms/Responsive Image',
  component: ResponsiveImage,
  parameters: {
    docs: {
      description: {
        component:
          'This component will render an Image that is handed in from parent component or show a placeholder if the image is not available.',
      },
      source: {
        code: '<ResponsiveImage provider="storyblok" v-bind="{}" />',
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
  template: `<ResponsiveImage v-bind="args"/>`,
  // template: `<ResponsiveImage
  //               v-bind="args"
  //               provider="storyblok"
  //               :default-size="{ width: '375px', height: '375px' }"
  //               :sizes="[
  //                 { media: 'xl', height: '360px', width: '360px' },
  //                 { media: 'lg', height: '256px', width: '256px' },
  //                 { media: 'md', height: '192px', width: '192px' },
  //                 { media: 's', height: '320px', width: '320px' },
  //               ]"/>`,
})

export const Default = Template.bind({})
Default.args = {}
