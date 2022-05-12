export default {
  name: 'Carousel',
  display_name: 'Carousel',
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
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['TeaserCard'],
      pos: 3,
    },
    isWide: {
      type: 'boolean',
      display_name: 'Wide Carousel',
      description:
        'Let the carousel span over the full width of the page and let it break out of the usual content grid.',
      pos: 4,
    },
    autoplay: {
      type: 'boolean',
      display_name: 'Autoplay',
      description: 'Enables autoplay on carousel.',
      pos: 5,
    },
    infinite: {
      type: 'boolean',
      display_name: 'Inifinite',
      description: 'Enables infinite wrap around slides on carousel.',
      pos: 6,
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
