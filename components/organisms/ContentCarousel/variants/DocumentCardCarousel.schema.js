import Carousel from '../ContentCarousel.schema.partial.js'

const CarouselOptions = { ...Carousel }
delete CarouselOptions.isWide

export default {
  name: 'DocumentCardCarousel',
  display_name: 'Document Card Carousel',
  schema: {
    ...CarouselOptions,
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
