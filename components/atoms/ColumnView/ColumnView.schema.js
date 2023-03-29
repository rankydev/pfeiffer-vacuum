export default {
  name: 'ColumnView',
  display_name: 'Column View',
  schema: {
    variant: {
      type: 'option',
      exclude_empty_option: true,
      default_value: '66',
      description: 'The variants are for different stylings',
      options: [
        {
          value: '66',
          name: 'one column',
        },
        {
          value: '50',
          name: 'two columns',
        },
        {
          value: '33',
          name: 'three columns',
        },
      ],
    },
    column1: {
      display_name: 'Column 1',
      type: 'bloks',
      restrict_components: true,
      component_whitelist: [
        'Accordion',
        'ImageWithDescription',
        'Richtext',
        'Button',
        'ButtonWithPermissionCheck',
        'KnowledgeAuthorsList',
      ],
    },
    column2: {
      display_name: 'Column 2',
      type: 'bloks',
      restrict_components: true,
      component_whitelist: [
        'Accordion',
        'ImageWithDescription',
        'Richtext',
        'Button',
        'ButtonWithPermissionCheck',
        'KnowledgeAuthorsList',
      ],
    },
    column3: {
      display_name: 'Column 3',
      type: 'bloks',
      restrict_components: true,
      component_whitelist: [
        'Accordion',
        'ImageWithDescription',
        'Richtext',
        'Button',
        'ButtonWithPermissionCheck',
        'KnowledgeAuthorsList',
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
  real_name: 'ColumnView',
}
