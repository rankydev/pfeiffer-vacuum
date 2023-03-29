import Richtext from '~/components/atoms/Richtext/Richtext.schema.js'

export default {
  name: 'HelpContainer',
  display_name: 'Help Container',
  schema: {
    headline: {
      type: 'text',
      max_length: '55',
      translatable: true,
    },
    subline: {
      type: 'text',
      max_length: '55',
      translatable: true,
    },
    richtext: {
      ...Richtext.schema.richtext,
      required: true,
    },
    buttons: {
      type: 'bloks',
      maximum: 2,
      restrict_components: true,
      component_whitelist: ['Button', 'ButtonWithPermissionCheck'],
    },
    icon: {
      type: 'text',
      description:
        'Use an icon from https://fonts.google.com/icons here (e.g. calculate)',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'HelpContainer',
}
