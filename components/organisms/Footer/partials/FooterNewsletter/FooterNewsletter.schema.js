import Richtext from '~/components/atoms/Richtext/Richtext.schema.js'

export default {
  name: 'FooterNewsletter',
  display_name: 'Newsletter Module',
  schema: {
    headline: {
      type: 'text',
      display_name: 'Newsletter Headline',
      translatable: true,
    },
    richtext: {
      ...Richtext.schema.richtext,
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
