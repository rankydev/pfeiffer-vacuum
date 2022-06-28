import Carousel from '../ContentCarousel.schema.partial.js'

export default {
  name: 'GeneralTeaserCarousel',
  display_name: 'General-Teaser-Carousel',
  schema: {
    ...Carousel,
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['TeaserCard'],
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
  real_name: 'GeneralTeaserCarousel',
  component_group_uuid: null,
}