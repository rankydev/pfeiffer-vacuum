export default {
  name: 'AnchorWrapper',
  display_name: 'Anchor Wrapper',
  schema: {
    id: {
      type: 'text',
      display_name: 'Identifier',
      required: true,
    },
    content: {
      type: 'bloks',
      display_name: 'Content',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'AnchorWrapper',
  component_group_uuid: null,
}
