import documentCard from '~/components/molecules/DocumentCard/DocumentCard.stories.content.js'

const cmsCard = {
  ...documentCard,
  uiComponent: 'DocumentCard',
}

export const headline = 'Document Card Carousel'
export const slides = [cmsCard, cmsCard, cmsCard, cmsCard, cmsCard, cmsCard]

export default {
  headline,
  slides,
}
