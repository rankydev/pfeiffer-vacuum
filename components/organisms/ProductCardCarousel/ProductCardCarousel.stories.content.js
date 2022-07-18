import contentCarouselContent from '~/components/organisms/ContentCarousel/ContentCarousel.stories.content'
import { product } from '~/components/molecules/ProductCard/ProductCard.stories.content'

export const carouselEntry = {
  product: product,
  component: 'ProductCard',
  provider: 'static',
}

export const carouselEntries = [
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
]

export default {
  ...contentCarouselContent,
  button: [
    {
      _uid: '5f3551f0-2e8e-4ddb-a7ed-938b08be3f4c',
      icon: 'arrow_forward',
      size: 'normal',
      label: 'Button',
      shape: 'plain',
      variant: 'secondary',
      disabled: false,
      component: 'Button',
      prependIcon: false,
    },
  ],
  headline: 'Product Card Carousel Headline',
  slides: carouselEntries,
}
