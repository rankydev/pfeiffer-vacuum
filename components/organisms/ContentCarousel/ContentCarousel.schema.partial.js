import Carousel from '~/components/atoms/GenericCarousel/GenericCarousel.schema.partial.js'

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
  ...Carousel,
  'tab-advanced': {
    type: 'tab',
    display_name: 'Advanced',
    keys: ['uiComponent'],
  },
  uiComponent: {
    type: 'text',
    default_value: 'ContentCarousel',
  },
}
