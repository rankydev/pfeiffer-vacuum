export default {
  'tab-advanced': {
    type: 'tab',
    display_name: 'Advanced',
    keys: ['template', 'uiComponent'],
  },
  template: {
    type: 'option',
    use_uuid: true,
    source: 'internal_stories',
    folder_slug: '{0}/templates/',
    filter_content_type: 'PageConfiguration',
  },
  uiComponent: {
    type: 'text',
    default_value: 'Page',
  },
}
