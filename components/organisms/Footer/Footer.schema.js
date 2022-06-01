import FooterNewsletter from './partials/FooterNewsletter/FooterNewsletter.schema'

export default {
  name: 'Footer',
  display_name: 'Footer',
  schema: {
    socialMedia: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['SocialMediaIconLink'],
      display_name: 'Social Media Entries',
      maximum: 5,
    },
    navigationColumns: {
      type: 'bloks',
      maximum: 3,
      restrict_components: true,
      component_whitelist: ['LinkList'],
      display_name: 'Navigation Columns',
    },
    ...FooterNewsletter.schema,
    copyright: {
      type: 'text',
      translatable: true,
      display_name: 'Copyright Text',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Footer',
  component_group_name: 'Global',
}
