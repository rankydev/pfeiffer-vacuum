export default {
  name: 'ContactRequestSelection',
  display_name: 'Contact Request Selection',
  schema: {
    mainHeadline: {
      type: 'text',
      max_length: '55',
      translatable: true,
    },
    sectionHeadline: {
      type: 'text',
      max_length: '55',
      translatable: true,
    },
    text: {
      type: 'text',
      translatable: true,
    },
    requestSubjects: {
      type: 'bloks',
      restrict_components: true,
      required: true,
      component_whitelist: ['ContactRequestSubject'],
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ContactRequestSelection',
}
