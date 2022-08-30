export default {
  name: 'Quicklink',
  display_name: 'Quicklink',
  schema: {
    label: {
      type: 'text',
      translatable: true,
      display_name: 'Label',
      max_length: '30',
    },
    anchor: {
      type: 'text',
      display_name: 'Anchor',
      description:
        'Which anchor do you want to scroll to? (Must exist on the page or there will be no scroll)',
    },
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
      default_value: 'quicklink',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: false,
  all_presets: [],
  preset_id: null,
  real_name: 'Quicklink',
}
