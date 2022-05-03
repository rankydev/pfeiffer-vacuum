import Richtext from '~/components/atoms/Richtext/Richtext.schema.js'

export default {
  name: 'ContentTextBlock',
  display_name: 'Content Text Block',
  schema: {
    text: Richtext.schema.richtext,
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
