import Link from '~/components/atoms/Link/Link.schema.partial.js'

export default {
  name: 'MainNavLinkMobile',
  display_name: 'Mobile Navigation Entry',
  schema: {
    label: {
      type: 'text',
      translatable: true,
      display_name: 'Label',
      required: true,
    },
    ...Link,
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'MainNavLinkMobile',
  component_group_name: 'Global',
}
