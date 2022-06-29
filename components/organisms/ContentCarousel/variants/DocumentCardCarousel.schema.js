import GenericCarousel from '~/components/atoms/GenericCarousel/GenericCarousel.schema.partial.js'
import ContentCarousel from '../ContentCarousel.schema.partial.js'

const { autoplay, autoplaySpeed, infinite } = GenericCarousel
const { headline, button, uiComponent } = ContentCarousel

export default {
  name: 'DocumentCardCarousel',
  display_name: 'Document Card Carousel',
  schema: {
    headline,
    button,
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['DocumentCard'],
      maximum: 16,
      required: true,
      pos: 3,
    },
    autoplay,
    autoplaySpeed,
    infinite,
    'tab-advanced': ContentCarousel['tab-advanced'],
    uiComponent,
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
