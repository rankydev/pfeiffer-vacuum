import Carousel from '@/components/atoms/Carousel/Carousel.schema-template.js'

export default {
  headline: {
    type: 'text',
    display_name: 'Headline',
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
}
