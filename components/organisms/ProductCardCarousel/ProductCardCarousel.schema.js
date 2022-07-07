import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel.schema.partial.js'

export default {
  name: 'ProductCardCarousel',
  display_name: 'ProductCardCarousel',
  schema: {
    ...ContentCarousel,
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['ProductCard'],
      maximum: 16,
      required: true,
      pos: 3,
    },
  },
  image: null,
  preview_field: null,
  preview_tmpl: '<div>{{ label }}</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ProductCardCarousel',
  component_group_uuid: null,
}
