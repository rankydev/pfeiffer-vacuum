export default {
  name: 'HomeStageSlide',
  display_name: 'HomeStageSlide',
  schema: {
    stageContent: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['HomeStageSlideContent'],
      display_name: 'Home Stage Content',
      required: true,
    },
    image: {
      type: 'asset',
      description: '',
      display_name: 'Background Image',
      filetypes: ['images'],
    },
    interlay: {
      type: 'asset',
      description: '',
      display_name: 'Interlay',
      filetypes: ['images'],
    },
    bubble: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Bubble'],
    },
  },
  is_root: false,
  preview_tmpl:
    '<div>' + '<div>{{image(options.interlay.filename)/}}</div>' + '</div>',
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'HomeStageSlide',
}
