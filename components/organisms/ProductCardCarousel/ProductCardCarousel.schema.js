import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel.schema.partial.js'

export default {
  name: 'ProductCardCarousel',
  display_name: 'ProductCardCarousel',
  schema: {
    headline: ContentCarousel.headline,
    button: ContentCarousel.button,
    autoplay: ContentCarousel.autoplay,
    autoplaySpeed: ContentCarousel.autoplaySpeed,
    infinite: ContentCarousel.infinite,
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
  preview_tmpl:
    '<div>' +
    '<div>Headline: {{ headline }}</div>' +
    '<div>Number of Slides: {{ slides.length }}</div>' +
    '</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  real_name: 'ProductCardCarousel',
  component_group_uuid: null,
}
