export default {
  name: 'CTABox',
  display_name: 'Call to action Box',
  schema: {
    image: {
      type: 'asset',
      display_name: 'Image',
      required: true,
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
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'CTABox',
}
