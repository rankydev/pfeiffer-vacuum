import ContentCarousel from '../ContentCarousel'
import generalTeaserCarouselContent from './GeneralTeaserCarousel.stories.content'
import customContentCardCarouselContent from '~/components/organisms/ContentCarousel/variants/CustomContentCardCarousel.stories.content.js'

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
}

export default {
  title: 'Organisms/o_111 Custom content-Card-Carousel',
  component: ContentCarousel,
  parameters: {
    docs: {
      description: {
        component:
          'Carousel component rendering the custom content card carousel component, with added content above the carousel.',
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

export const CustomContentCarousel = Template.bind({})
CustomContentCarousel.args = {
  ...customContentCardCarouselContent,
}
