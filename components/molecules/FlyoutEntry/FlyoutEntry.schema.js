import Link from '~/components/atoms/Link/Link.schema.js'

export default {
  name: 'FlyoutEntry',
  display_name: 'FlyoutEntry',
  schema: {
    label: {
      type: 'text',
      description: 'Visible text on hover',
      translatable: true,
      max_length: '30',
    },
    icon: {
      type: 'text',
      description:
        'Use an icon from https://jossef.github.io/material-design-icons-iconfont/ here (e.g. calculate)',
    },
    ...Link.schema,
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Flyout Entry',
}
