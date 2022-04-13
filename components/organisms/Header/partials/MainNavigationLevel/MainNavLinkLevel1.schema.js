import Link from '~/components/atoms/Link/Link.schema.js'

export default {
  name: 'MainNavLinkLevel1',
  display_name: 'Navigation Entry',
  schema: {
    label: {
      type: 'text',
      translatable: true,
      display_name: 'Label',
    },
    ...Link.schema,
    shopLink: {
      ...Link.schema.href,
      display_name: 'Shop Link',
      required: false,
    },
    navigationEntries: {
      type: 'bloks',
      maximum: 10,
      restrict_components: true,
      component_whitelist: ['MainNavLinkLevel2'],
      description: 'Navigation entries displayed on second level.',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'MainNavLinkLevel1',
  component_group_name: 'Global',
}
