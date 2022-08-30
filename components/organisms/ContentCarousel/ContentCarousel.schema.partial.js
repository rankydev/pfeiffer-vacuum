import GenericCarousel from '~/components/atoms/GenericCarousel/GenericCarousel.schema.partial.js'

export default {
  headline: {
    type: 'text',
    display_name: 'Headline',
    translatable: true,
    pos: 1,
  },
  button: {
    type: 'bloks',
    maximum: 1,
    restrict_components: true,
    component_whitelist: ['Button'],
    display_name: 'Button',
    pos: 2,
  },
  autoplay: GenericCarousel.autoplay,
  autoplaySpeed: GenericCarousel.autoplaySpeed,
  infinite: GenericCarousel.infinite,
  'tab-advanced': {
    type: 'tab',
    display_name: 'Advanced',
    keys: ['uiComponent', 'transparent'],
  },
  uiComponent: {
    type: 'text',
    default_value: 'ContentCarousel',
  },
}
