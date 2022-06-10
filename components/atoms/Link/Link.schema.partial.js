export default {
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
}
