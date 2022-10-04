export default {
  name: 'CategoryPage',
  display_name: 'CategoryPage',
  schema: {
    title: {
      type: 'text',
      required: true,
      max_length: '55',
      description:
        'Keep the title around 50 characters and put the keywords you’re focusing on first.',
      translatable: true,
    },
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
      default_value: 'CategoryPage',
    },
  },
  image: null,
  preview_field: null,
  is_root: true,
  preview_tmpl: null,
  is_nestable: false,
  all_presets: [],
  preset_id: null,
  real_name: 'CategoryPage',
  color: null,
  icon: null,
  component_group_name: 'Templates',
}
