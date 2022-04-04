export default {
  name: 'FooterNewsletter',
  display_name: 'Footer Newsletter',
  schema: {
    title: {
      type: 'text',
      translatable: true,
      display_name: 'Title',
      max_length: '30',
    },
    text: {
      type: 'text',
      translatable: true,
      display_name: 'Text',
      max_length: '120',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'FooterNewsletter',
  component_group_name: 'Global',
}
