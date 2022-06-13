import Carousel from '@/components/atoms/Carousel/Carousel.schema-template.js'

export default {
  name: 'HomeStageCarousel',
  display_name: 'Home Stage Carousel',
  schema: {
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['HomeStageModule'],
      maximum: 5,
      required: true,
      pos: 1,
    },
    autoplay: Carousel.autoplay,
    autoplaySpeed: Carousel.autoplaySpeed,
    infinite: Carousel.infinite,
  },
  image: null,
  preview_field: null,
  preview_tmpl: '<div>{{ label }}</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'HomeStageCarousel',
  component_group_uuid: null,
}
