import Link from './Link.schema.partial.js'

export default {
  name: 'TextLink',
  display_name: 'TextLink',
  schema: {
    label: {
      type: 'text',
      translatable: true,
      display_name: 'Label',
    },
    ...Link,
    'tab-advanced': {
      type: 'tab',
      display_name: 'Advanced',
      keys: ['uiComponent', 'variant'],
    },
    uiComponent: {
      type: 'text',
      default_value: 'Link',
    },
    variant: {
      type: 'text',
      default_value: 'textlink',
    },
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
