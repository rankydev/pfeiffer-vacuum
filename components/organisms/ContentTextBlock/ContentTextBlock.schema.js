import Richtext from '~/components/atoms/Richtext/Richtext.schema.js'

export default {
  name: 'ContentTextBlock',
  display_name: 'Content Text Block',
  schema: {
    text: Richtext.schema.richtext,
    button: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Button'],
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ContentTextBlock',
}
