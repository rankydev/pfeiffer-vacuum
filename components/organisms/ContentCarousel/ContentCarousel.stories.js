import ContentCarousel from './ContentCarousel'
import contentCarouselContent from './ContentCarousel.stories.content'
import contentCustomContentCardCarousel from '~/components/organisms/ContentCarousel/variants/CustomContentCardCarousel.stories.content.js'

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
  slides: {
    control: { type: 'array' },
    defaultValue: contentCarouselContent.slides,
  },
}

export default {
  title: 'Organisms/Carousels/ContentCarousel',
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

export const TeaserCardCarousel = Template.bind({})
TeaserCardCarousel.args = {
  ...contentCarouselContent,
}

export const CustomContentCarousel = Template.bind({})
CustomContentCarousel.args = {
  ...contentCustomContentCardCarousel,
}
