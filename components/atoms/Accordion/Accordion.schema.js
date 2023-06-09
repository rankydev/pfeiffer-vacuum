export default {
  name: 'Accordion',
  display_name: 'Accordion',
  schema: {
    level: {
      display_name: 'Heading',
      type: 'option',
      use_uuid: true,
      required: true,
      options: [
        {
          value: 'h3',
          name: 'Heading 3',
        },
        {
          value: 'paragraph',
          name: 'Paragraph',
        },
      ],
    },
    accordionEntries: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['AccordionEntry'],
      display_name: 'Accordion Entries',
    },
    multiple: {
      type: 'boolean',
      description: 'Allow the user to open multiple entries at the same time',
      display_name: 'Multiple',
      default_value: false,
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Accordion',
  component_group_uuid: null,
}
