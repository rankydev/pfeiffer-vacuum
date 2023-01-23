import Link from '~/components/atoms/Link/Link.schema.partial.js'

export default {
  name: 'ShopNavigationEntry',
  display_name: 'Shop Navigation Entry',
  schema: {
    icon: {
      type: 'text',
      description:
        'Use an icon from https://fonts.google.com/icons here (e.g. calculate)',
    },
    label: {
      type: 'text',
      translatable: true,
      display_name: 'Label',
      required: true,
    },
    ...Link,
  },
  preview_tmpl: '<div>' + '<div>Label: {{ label }}</div>' + '</div>',
  is_root: false,
  is_nestable: true,
  real_name: 'ShopNavigationEntry',
  component_group_name: 'Global',
}
