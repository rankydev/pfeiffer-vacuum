import Link from '~/components/atoms/Link/Link.schema.js'

export default {
  name: 'TextLink',
  display_name: 'TextLink',
  schema: {
    label: {
      type: 'text',
      translatable: true,
      display_name: 'Label',
    },
    ...Link.schema,
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'TextLink',
  component_group_uuid: null,
}
