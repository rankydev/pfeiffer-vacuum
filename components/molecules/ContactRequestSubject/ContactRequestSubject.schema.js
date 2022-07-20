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
      type: 'bloks',
      display_name: 'Contact Request Type',
      restrict_components: true,
      component_whitelist: ['ContactCTABox'],
      description:
        'Please choose the type of the contact form to show when clicking the subject.',
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
