export default {
  name: 'WideCarousel',
  display_name: 'Wide Carousel',
  schema: {
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['TeaserCard'],
    },
    infinite: {
      type: 'boolean',
      description: 'Infinitely wrap around contents.',
      display_name: 'Infinity Carousel',
      default_value: false,
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
