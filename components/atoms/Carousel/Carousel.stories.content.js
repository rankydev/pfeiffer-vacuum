import {
  targets,
  href,
  target,
  image,
  headline,
} from '~/components/molecules/TeaserCard/TeaserCard.stories.content'

export const carouselEntry = {
  targets,
  href,
  target,
  image,
  headline,
  component: 'TeaserCard',
}

export const carouselEntries = [
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
  carouselEntry,
]

export default {
  autoplay: false,
  autoplaySpeed: '5000',
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
  infinite: false,
  isWide: true,
  settings: {},
  slides: carouselEntries,
}
