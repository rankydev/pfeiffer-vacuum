import RichtextBasic from '~/components/atoms/Richtext/RichtextBasic.schema'

export default {
  name: 'FooterNewsletter',
  display_name: 'Footer Newsletter',
  schema: {
    headline: {
      type: 'text',
      display_name: 'Newsletter Headline',
      translatable: true,
    },
    richtext: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['RichtextBasic'],
      display_name: 'Newsletter Description',
    },
    button: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Button'],
      display_name: 'Newsletter Button',
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
