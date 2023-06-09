export default {
  name: 'AccordionEntry',
  display_name: 'Accordion Entry',
  schema: {
    label: {
      type: 'text',
      translatable: true,
      display_name: 'Title',
    },
    isActive: {
      type: 'boolean',
      description:
        'Attention: If multiple is not selected only the first checked element in the column will be opened',
      display_name: 'Initially open',
      default_value: false,
    },
    items: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: [
        'Richtext',
        'ImageWithDescription',
        'Button',
        'ButtonWithPermissionCheck',
      ],
      display_name: 'Content',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'AccordionEntry',
  component_group_uuid: null,
}
