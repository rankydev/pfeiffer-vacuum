import generalTeaserCarouselContent from './GeneralTeaserCarousel.stories.content'
import customContentCardContent from '~/components/molecules/CustomContentCard/CustomContentCard.stories.content'

export const carouselEntry = {
  ...customContentCardContent,
  component: 'CustomContentCard',
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
  headline: 'Headline',
  ...generalTeaserCarouselContent,
  slides: carouselEntries,
}
