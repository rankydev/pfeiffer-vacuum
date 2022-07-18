export default {
  name: 'ContactRequestForm',
  display_name: 'Contact Request Form',
  schema: {
    contactRequestType: {
      type: 'custom',
      required: true,
      field_type: 'pfeiffer-vacuum-contact-request-selector',
      display_name: 'Contact Request Picker',
    },
    buttons: {
      type: 'bloks',
      restrict_components: true,
      required: true,
      maximum: 1,
      component_whitelist: ['Button'],
      display_name: 'Buttons',
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
