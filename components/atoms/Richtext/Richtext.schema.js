export default {
  name: 'Richtext',
  display_name: 'Richtext',
  schema: {
    richtext: {
      type: 'richtext',
      pos: 2,
      translatable: true,
      display_name: 'Richtext',
      customize_toolbar: true,
      toolbar: [
        'bold',
        'underline',
        'paragraph',
        'h2',
        'h3',
        'h4',
        'h5',
        'list',
        'h6',
        'olist',
        'link',
      ],
      style_options: [
        {
          value: 'tw-subline tw-subline-2',
          name: 'Subline H2',
        },
        {
          value: 'tw-subline tw-subline-3',
          name: 'Subline H3',
        },
        {
          value: 'tw-subline tw-subline-4',
          name: 'Subline H4',
        },
        {
          value: 'tw-subline tw-subline-5',
          name: 'Subline H5',
        },
        {
          value: 'tw-subline tw-subline-6',
          name: 'Subline H6',
        },
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
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Richtext',
  component_group_uuid: null,
}
