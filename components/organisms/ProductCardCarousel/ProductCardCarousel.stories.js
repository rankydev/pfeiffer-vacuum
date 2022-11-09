import ProductCardCarousel from './ProductCardCarousel'
import productCardCarouselContent from './ProductCardCarousel.stories.content'

const argTypes = {
  autoplay: {
    control: { type: 'boolean' },
    defaultValue: productCardCarouselContent.autoplay,
  },
  autoplaySpeed: {
    control: { type: 'number' },
    defaultValue: productCardCarouselContent.autoplaySpeed,
  },
  button: {
    control: { type: 'array' },
    defaultValue: productCardCarouselContent.button,
  },
  headline: {
    control: { type: 'text' },
    defaultValue: productCardCarouselContent.headline,
  },
  infinite: {
    control: { type: 'boolean' },
    defaultValue: productCardCarouselContent.infinite,
  },
  slides: {
    control: { type: 'array' },
    defaultValue: productCardCarouselContent.slides,
  },
}

export default {
  title: 'Organisms/o_106 Product Card Carousel',
  component: ProductCardCarousel,
  parameters: {
    docs: {
      description: {
        component:
          'Carousel component rendering the content carousel and product cards, based on product codes maintained in Storyblok.',
      },
    },
  },
  argTypes,
}

const Template = (args, { argTypes: types }) => ({
  components: { ProductCardCarousel },
  props: Object.keys(types),
  setup() {
    return { args }
  },
  template: `
    <div class="documentation-preview">
    <ProductCardCarousel v-bind="args" />
    </div>
  `,
})

export const Default = Template.bind({})
Default.args = {}
