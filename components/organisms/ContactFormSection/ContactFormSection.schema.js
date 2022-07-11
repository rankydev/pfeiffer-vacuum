export default {
  name: 'ContactFormSection',
  display_name: 'Contact Form Section',
  schema: {
    contactPersons: {
      display_name: 'Contact Persons',
      type: 'bloks',
      maximum: 10,
      restrict_components: true,
      component_whitelist: ['Accordion'],
    },
    requestForms: {
      display_name: 'Request Forms',
      type: 'bloks',
      maximum: 10,
      restrict_components: true,
      component_whitelist: ['Accordion'],
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ContactFormSection',
}
