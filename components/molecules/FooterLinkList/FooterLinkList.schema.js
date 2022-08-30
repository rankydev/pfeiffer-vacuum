export default {
  name: 'FooterLinkList',
  display_name: 'Link List',
  schema: {
    title: {
      type: 'text',
      translatable: true,
      display_name: 'Title',
    },
    links: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['TextLink', 'PrivacyLink'],
      display_name: 'Links',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'FooterLinkList',
  component_group_uuid: null,
}
