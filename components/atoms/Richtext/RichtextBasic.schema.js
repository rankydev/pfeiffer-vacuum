export default {
  name: 'RichtextBasic',
  display_name: 'Richtext',
  schema: {
    richtext: {
      type: 'richtext',
      pos: 2,
      translatable: true,
      display_name: 'Richtext',
      customize_toolbar: true,
      toolbar: ['bold', 'underline', 'paragraph', 'olist', 'link'],
      style_options: [
        {
          value: 'superscript',
          name: 'Superscript',
        },
        {
          value: 'subscript',
          name: 'Subscript',
        },
      ],
    },
    'tab-advanced': {
      type: 'tab',
      display_name: 'Advanced',
      keys: ['uiComponent'],
    },
    uiComponent: {
      type: 'text',
      default_value: 'Richtext',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'RichtextBasic',
}
