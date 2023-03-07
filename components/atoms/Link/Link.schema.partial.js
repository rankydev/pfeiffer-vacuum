export default {
  href: {
    type: 'multilink',
    display_name: 'Link',
    restrict_content_types: true,
    required: true,
    translatable: true,
    link_scope: '{0}/',
    force_link_scope: true,
    component_whitelist: [
      'CategoryContentPage',
      'ContactPage',
      'Page',
      'EcomPage',
      'KnowledgePage',
    ],
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
