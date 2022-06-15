import GenericCarousel from '~/components/atoms/GenericCarousel/GenericCarousel.schema.partial.js'

export default {
  name: 'HomeStage',
  display_name: 'Home Stage',
  schema: {
    slides: {
      type: 'bloks',
      display_name: 'Slides',
      restrict_components: true,
      component_whitelist: ['HomeStageSlide'],
      maximum: 5,
      required: true,
      pos: 1,
    },
    autoplay: GenericCarousel.autoplay,
    autoplaySpeed: GenericCarousel.autoplaySpeed,
    infinite: GenericCarousel.infinite,
  },
  image: null,
  preview_field: null,
  preview_tmpl: '<div>{{ label }}</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'HomeStage',
  component_group_uuid: null,
}
