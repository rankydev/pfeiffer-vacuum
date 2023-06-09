import Richtext from '~/components/atoms/Richtext/Richtext.schema.js'

export default {
  name: 'Bubble',
  display_name: 'Bubble',
  schema: {
    title: {
      type: 'text',
      max_length: '20',
      translatable: true,
    },
    richtext: {
      ...Richtext.schema.richtext,
      display_name: 'Description',
    },
    position: {
      type: 'option',
      use_uuid: true,
      description: '',
      exclude_empty_option: true,
      options: [
        {
          value: 'left',
          name: 'left',
        },
        {
          value: 'right',
          name: 'right',
        },
      ],
      default_value: 'right',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Bubble',
}
