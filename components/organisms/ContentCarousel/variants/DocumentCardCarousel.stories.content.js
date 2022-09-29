import documentCardContent from '~/components/molecules/DocumentCard/DocumentCard.stories.content.js'
import GeneralTeaserCarouselContent from './GeneralTeaserCarousel.stories.content'

const carouselEntry = {
  ...documentCardContent,
  component: 'DocumentCard',
}

export const slides = [
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
  button: [
    {
      _uid: '5f3551f0-2e8e-4ddb-a7ed-938b08be3f4c',
      icon: 'arrow_forward',
      size: 'normal',
      label: 'Btn',
      shape: 'plain',
      variant: 'secondary',
      disabled: false,
      component: 'Button',
      prependIcon: false,
    },
  ],
  headline: 'Document Card Carousel',
  ...GeneralTeaserCarouselContent,
  slides,
  variant: 'documentCardCarousel',
}
