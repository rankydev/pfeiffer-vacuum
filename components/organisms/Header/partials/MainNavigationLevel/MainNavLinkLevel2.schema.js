import Link from '~/components/atoms/Link/Link.schema.js'

export default {
  name: 'MainNavLinkLevel2',
  display_name: 'Navigation Entry',
  schema: {
    label: {
      type: 'text',
      translatable: true,
      display_name: 'Label',
      required: true,
    },
    ...Link.schema,
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'MainNavLinkLevel2',
  component_group_name: 'Global',
}
