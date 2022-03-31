export default {
  name: 'OnPageNavigation',
  display_name: 'OnPageNavigation',
  schema: {
    quicklinks: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['Quicklink'],
      maximum: 4,
      description: 'Links for Quicklink Navigation',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'OnPageNavigation',
}
