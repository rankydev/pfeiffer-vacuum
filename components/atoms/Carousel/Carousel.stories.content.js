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
  infinite: false,
  isWide: true,
  settings: {},
  slides: carouselEntries,
}
