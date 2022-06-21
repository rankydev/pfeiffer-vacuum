import Carousel from '../ContentCarousel.schema.partial.js'

export default {
  name: 'CustomContentCardCarousel',
  display_name: 'Custom Content-Card-Carousel',
  schema: {
    ...Carousel,
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['CustomContentCard'],
      maximum: 16,
      required: true,
    },
  },
  image: null,
  preview_field: null,
  preview_tmpl: '<div>{{ label }}</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'CustomContentCardCarousel',
  component_group_uuid: null,
}
