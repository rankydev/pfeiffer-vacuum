export default {
  name: 'Stage',
  display_name: 'Stage',
  schema: {
    image: {
      type: 'asset',
      description: '',
      display_name: 'Image',
      filetypes: ['images'],
      pos: 2,
      required: true,
    },
    stageContent: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['StageContent'],
      display_name: 'Stage Content',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Stage',
  component_group_uuid: null,
}
