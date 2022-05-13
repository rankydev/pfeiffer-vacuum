import Carousel from './Carousel'
import carouselContent from './Carousel.stories.content'

const argTypes = {
  autoplay: {
    control: { type: 'boolean' },
    defaultValue: carouselContent.autoplay,
  },
  button: {
    control: { type: 'array' },
    defaultValue: carouselContent.button,
  },
  headline: {
    control: { type: 'text' },
    defaultValue: carouselContent.headline,
  },
  isWide: {
    control: { type: 'boolean' },
    defaultValue: carouselContent.isWide,
  },
  infinite: {
    control: { type: 'boolean' },
    defaultValue: carouselContent.infinite,
  },
  settings: {
    control: { type: 'object' },
    defaultValue: carouselContent.settings,
  },
  slides: {
    control: { type: 'array' },
    defaultValue: carouselContent.slides,
  },
}

export default {
  title: 'Technical components/Carousel',
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component:
          'Generic carousel component used for various carousel modules',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { Carousel },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <Carousel v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
