import ContentCarousel from '../ContentCarousel.schema.partial.js'

export default {
  name: 'GeneralTeaserCarousel',
  display_name: 'General-Teaser-Carousel',
  schema: {
    ...ContentCarousel,
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['TeaserCard'],
      maximum: 16,
      required: true,
      pos: 3,
    },
    transparent: {
      type: 'boolean',
      display_name: 'Transparent',
      default_value: 'true',
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
  real_name: 'GeneralTeaserCarousel',
  component_group_uuid: null,
}
