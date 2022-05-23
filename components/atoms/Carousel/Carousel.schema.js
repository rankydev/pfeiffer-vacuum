export default {
  name: 'Carousel',
  display_name: 'Carousel',
  schema: {
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['TeaserCard'],
      maximum: 16,
      required: true,
    },
    isWide: {
      type: 'boolean',
      display_name: 'Wide Carousel',
      description:
        'Let the carousel span over the full width of the page and let it break out of the usual content grid.',
    },
    autoplay: {
      type: 'boolean',
      display_name: 'Autoplay',
      description: 'Enables autoplay on carousel.',
    },
    autoplaySpeed: {
      type: 'number',
      display_name: 'Autoplay Speed',
      description: 'Autoplay Speed in milliseconds',
      default_value: 5000,
    },
    infinite: {
      type: 'boolean',
      display_name: 'Infinite',
      description: 'Enables infinite wrap around slides on carousel.',
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
