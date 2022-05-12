export default {
  name: 'Carousel',
  display_name: 'Carousel',
  schema: {
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['TeaserCard'],
    },
  },
  image: null,
  preview_field: null,
  preview_tmpl: '<div>{{ label }}</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Carousel',
  component_group_uuid: null,
}
