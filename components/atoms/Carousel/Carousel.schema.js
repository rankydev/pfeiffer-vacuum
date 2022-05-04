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
    infinite: {
      type: 'boolean',
      description: 'Infinitely wrap around contents.',
      display_name: 'Infinity Carousel',
      default_value: false,
    },
    centerMode: {
      type: 'boolean',
      description:
        'Enables centered view with partial prev/next slides. use with odd numbered slidesToShow counts.',
      display_name: 'Center Mode',
      default_value: false,
    },
    autoplay: {
      type: 'boolean',
      description: 'Enable autoplay.',
      display_name: 'Autoplay',
      default_value: false,
    },
    dots: {
      type: 'boolean',
      description: 'Enable dot indicators.',
      display_name: 'Dots',
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
