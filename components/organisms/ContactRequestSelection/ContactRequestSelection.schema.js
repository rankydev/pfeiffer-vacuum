import RichtextBasic from '~/components/atoms/Richtext/RichtextBasic.schema.js'

export default {
  name: 'ContactRequestSelection',
  display_name: 'Contact Request Selection',
  schema: {
    mainHeadline: {
      type: 'text',
      max_length: '55',
      translatable: true,
    },
    selectionHeadline: {
      type: 'text',
      max_length: '55',
      translatable: true,
    },
    text: {
      type: 'text',
      translatable: true,
    },
    contactRequests: {
      type: 'bloks',
      restrict_components: true,
      required: true,
      component_whitelist: ['ContactAccordion', 'Accordion'],
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
