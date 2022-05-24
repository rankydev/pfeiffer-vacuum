import ContentCarousel from './ContentCarousel'
import contentCarouselContent from './ContentCarousel.stories.content'

const argTypes = {
  autoplay: {
    control: { type: 'boolean' },
    defaultValue: contentCarouselContent.autoplay,
  },
  autoplaySpeed: {
    control: { type: 'number' },
    defaultValue: contentCarouselContent.autoplaySpeed,
  },
  button: {
    control: { type: 'array' },
    defaultValue: contentCarouselContent.button,
  },
  headline: {
    control: { type: 'text' },
    defaultValue: contentCarouselContent.headline,
  },
  isWide: {
    control: { type: 'boolean' },
    defaultValue: contentCarouselContent.isWide,
  },
  infinite: {
    control: { type: 'boolean' },
    defaultValue: contentCarouselContent.infinite,
  },
  settings: {
    control: { type: 'object' },
    defaultValue: contentCarouselContent.settings,
  },
  slides: {
    control: { type: 'array' },
    defaultValue: contentCarouselContent.slides,
  },
}

export default {
  title: 'Molecules/ContentCarousel',
  component: ContentCarousel,
  parameters: {
    docs: {
      description: {
        component:
          'Carousel component rendering the generic carousel component, with added content above the carousel.',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes }) => ({
  components: { ContentCarousel },
  props: Object.keys(argTypes),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
      <ContentCarousel v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
