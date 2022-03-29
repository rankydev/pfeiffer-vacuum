import Link from '../../../../atoms/Link/Link.schema.js'

export default {
  name: 'MainNavigationLink',
  display_name: 'MainNavigationLink',
  schema: {
    label: {
      type: 'text',
      translatable: true,
      display_name: 'Label',
    },
    ...Link.schema,
    navigationEntries: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['MainNavigationLink'],
      description: 'Navigation entries displayed on the left side.',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'MainNavigationLink',
  component_group_uuid: null,
}
