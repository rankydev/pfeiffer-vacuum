export default {
  name: 'ErrorImageStage',
  display_name: 'ErrorImageStage',
  schema: {
    stageContent: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['HomeStageSlideContent'],
      display_name: 'Error Stage Content',
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
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ErrorImageStage',
}
