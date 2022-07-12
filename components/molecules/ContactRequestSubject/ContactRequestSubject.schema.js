export default {
  name: 'ContactRequestSubject',
  display_name: 'Request Subject',
  schema: {
    title: {
      type: 'text',
      display_name: 'Title',
    },
    description: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Richtext'],
      display_name: 'Description',
    },
    type: {
      type: 'option',
      options: [
        {
          value: 'quote',
          name: 'Quote',
        },
        {
          value: 'service_request',
          name: 'Service Request',
        },
        {
          value: 'product_information',
          name: 'Product Information',
        },
        {
          value: 'general_query',
          name: 'General Query',
        },
      ],
      description:
        'Please choose the type of the contact form to show when clicking the subject.',
      default_value: 'quote',
      exclude_empty_option: true,
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ContactRequestSubject',
  component_group_uuid: null,
}
