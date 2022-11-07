export default {
  name: 'AnchorWrapper',
  display_name: 'Anchor Wrapper',
  schema: {
    id: {
      type: 'text',
      display_name: 'Identifier',
      required: true,
    },
  },
  preview_tmpl: '<div>' + '<div>Identifier: {{ id }}</div>' + '</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  real_name: 'AnchorWrapper',
  component_group_uuid: null,
}
