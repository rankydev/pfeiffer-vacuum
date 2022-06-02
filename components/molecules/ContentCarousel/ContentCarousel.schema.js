import Carousel from '~/components/atoms/Carousel/Carousel.schema.js'

export default {
  name: 'ContentCarousel',
  display_name: 'Carousel with Content',
  schema: {
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
    ...Carousel.schema,
  },
  image: null,
  preview_field: null,
  preview_tmpl: '<div>{{ label }}</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ContentCarousel',
  component_group_uuid: null,
}
