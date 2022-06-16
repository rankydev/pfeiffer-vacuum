import ContentCarousel from '~/components/organisms/ContentCarousel/ContentCarousel.schema.partial.js'

export default {
  name: 'DocumentCardCarousel',
  display_name: 'Document Card Carousel',
  schema: {
    headline: {
      type: 'text',
      display_name: 'Headline',
      required: true,
      pos: 1,
    },
    button: {
      type: 'bloks',
      display_name: 'Button',
      restrict_components: true,
      component_whitelist: ['Button'],
      maximum: 1,
      pos: 2,
    },
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['DocumentCard'],
      maximum: 16,
      required: true,
      pos: 3,
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'DocumentCardCarousel',
  component_group_uuid: null,
}
