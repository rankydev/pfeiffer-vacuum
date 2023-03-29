export default {
  name: 'ContentCTABox',
  display_name: 'Contact CTA Box',
  schema: {
    headline: {
      type: 'text',
      display_name: 'Headline',
      translatable: true,
    },
    description: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Richtext'],
      display_name: 'Description',
    },
    button: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Button', 'ButtonWithPermissionCheck'],
      display_name: 'Button',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ContentCTABox',
  component_group_uuid: null,
}
