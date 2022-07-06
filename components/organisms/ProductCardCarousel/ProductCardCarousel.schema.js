import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel.schema.partial.js'

export default {
  name: 'ProductCardCarousel',
  display_name: 'ProductCardCarousel',
  schema: {
    ...ContentCarousel.schema,
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
