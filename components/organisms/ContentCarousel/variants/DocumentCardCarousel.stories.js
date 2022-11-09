import ContentCarousel from '../ContentCarousel'
import generalTeaserCarouselContent from './GeneralTeaserCarousel.stories.content'
import documentCardCarouselContent from '~/components/organisms/ContentCarousel/variants/DocumentCardCarousel.stories.content.js'

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
  transparent: {
    control: { type: 'boolean' },
    defaultValue: true,
  },
  slides: {
    control: { type: 'array' },
    defaultValue: generalTeaserCarouselContent.slides,
  },
  variant: {
    control: { type: 'text' },
    defaultValue: documentCardCarouselContent.variant,
  },
}

export default {
  title: 'Organisms/o_107 Document-Card-Carousel',
  component: ContentCarousel,
  parameters: {
    docs: {
      description: {
        component:
          'Carousel component rendering the document card carousel component, with added content above the carousel.',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes: types }) => ({
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
  ...documentCardCarouselContent,
}
