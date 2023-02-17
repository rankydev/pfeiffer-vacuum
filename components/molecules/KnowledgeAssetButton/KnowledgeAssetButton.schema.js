export default {
  name: 'KnowledgeAssetButton',
  display_name: 'Knowledge Asset Button',
  schema: {
    type: {
      type: 'option',
      exclude_empty_option: true,
      default_value: 'WEBINAR',
      description: 'The knowledge types',
      options: [
        {
          value: 'WEBINAR',
          name: 'Webinar',
        },
        {
          value: 'WHITEPAPER',
          name: 'Whitepaper',
        },
      ],
    },
    id: {
      type: 'text',
      display_name: 'ID',
    },
    date: {
      type: 'datetime',
      disable_time: false,
      display_name: 'Date',
    },
    assetUrl: {
      type: 'multilink',
      display_name: 'Asset URL',
      restrict_content_types: true,
      required: true,
      translatable: true,
      link_scope: '{0}/',
      force_link_scope: true,
    },
    isDetailPage: {
      type: 'boolean',
      description:
        'If the component is a whitepaper, time and duration will not be displayed',
      display_name: 'is Detail Page',
      default_value: false,
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'KnowledgeAssetButton',
  component_group_uuid: null,
  color: null,
  icon: null,
}
