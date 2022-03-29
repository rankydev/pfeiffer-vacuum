export default {
  name: 'Header',
  display_name: 'Header',
  schema: {
    navigationEntries: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['MainNavigationLink'],
      pos: 1,
      description: 'Navigation bar entries displayed on the left side.',
    },
    flyoutLinks: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['FlyoutEntry'],
      pos: 1,
      maximum: '4',
      description: 'Links on the upper right',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Header',
}
