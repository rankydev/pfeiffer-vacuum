import ContentCarousel from '../ContentCarousel.schema.partial.js'

export default {
  name: 'CustomContentCardCarousel',
  display_name: 'Custom Content-Card-Carousel',
  schema: {
    ...ContentCarousel,
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['CustomContentCard'],
      maximum: 16,
      required: true,
      pos: 3,
    },
    'tab-advanced': {
      ...ContentCarousel['tab-advanced'],
      keys: [...ContentCarousel['tab-advanced'].keys, 'variant'],
    },
    variant: {
      type: 'text',
      default_value: 'customContentCardCarousel',
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
  real_name: 'CustomContentCardCarousel',
  component_group_uuid: null,
}
