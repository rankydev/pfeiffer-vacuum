import ContentCarousel from '../ContentCarousel'
import generalTeaserCarouselContent from './GeneralTeaserCarousel.stories.content'

const argTypes = {
  autoplay: {
    control: { type: 'boolean' },
    defaultValue: generalTeaserCarouselContent.autoplay,
  },
  autoplaySpeed: {
    control: { type: 'number' },
    defaultValue: generalTeaserCarouselContent.autoplaySpeed,
  },
  button: {
    control: { type: 'array' },
    defaultValue: generalTeaserCarouselContent.button,
  },
  headline: {
    control: { type: 'text' },
    defaultValue: generalTeaserCarouselContent.headline,
  },
  isWide: {
    control: { type: 'boolean' },
    defaultValue: generalTeaserCarouselContent.isWide,
  },
  infinite: {
    control: { type: 'boolean' },
    defaultValue: generalTeaserCarouselContent.infinite,
  },
  slides: {
    control: { type: 'array' },
    defaultValue: generalTeaserCarouselContent.slides,
  },
  transparent: {
    control: { type: 'boolean' },
    defaultValue: true,
  },
}

export default {
  title: 'Organisms/o_110 General-Teaser-Carousel',
  component: ContentCarousel,
  parameters: {
    docs: {
      description: {
        component:
          'Carousel component rendering the generic teaser carousel component, with added content above the carousel.',
      },
    },
  },
  argTypes,
}

const Template = (args, { types }) => ({
  components: { ContentCarousel },
  props: Object.keys(types),
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
Default.args = {
  ...generalTeaserCarouselContent,
}
