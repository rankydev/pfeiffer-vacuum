export default {
  name: 'ContactRequestForm',
  display_name: 'Contact Request Form',
  schema: {
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
  real_name: 'ContactRequestForm',
  component_group_uuid: null,
}
