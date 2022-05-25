export default {
  name: 'Link',
  display_name: 'Link',
  schema: {
    href: {
      type: 'multilink',
      display_name: 'Link',
      restrict_content_types: true,
      required: true,
      translatable: true,
      component_whitelist: ['Page', 'ProductContentPage', 'StandardPage'],
    },
    target: {
      type: 'option',
      use_uuid: true,
      options: [
        {
          value: '_blank',
          name: 'New tab / window',
        },
        {
          value: '_self',
          name: 'Same window',
        },
      ],
      default_value: '_self',
      display_name: 'Open linked page in',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Link',
  component_group_uuid: null,
}
