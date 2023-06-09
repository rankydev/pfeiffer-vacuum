import ContentCarousel from '../ContentCarousel.schema.partial.js'

export default {
  name: 'DocumentCardCarousel',
  display_name: 'Document Card Carousel',
  schema: {
    ...ContentCarousel,
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['DocumentCard'],
      maximum: 16,
      required: true,
      pos: 3,
    },
    transparent: {
      type: 'boolean',
      display_name: 'Transparent',
      default_value: 'true',
    },
    'tab-advanced': {
      ...ContentCarousel['tab-advanced'],
      keys: [...ContentCarousel['tab-advanced'].keys, 'variant'],
    },
    variant: {
      type: 'text',
      default_value: 'documentCardCarousel',
    },
  },
  preview_tmpl:
    '<div>' +
    '<div>Headline: {{ headline }}</div>' +
    '<div>Number of Slides: {{ slides.length }}</div>' +
    '</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  real_name: 'DocumentCardCarousel',
  component_group_uuid: null,
}
