export default {
  name: 'KnowledgeAuthor',
  display_name: 'KnowledgeAuthor',
  schema: {
    image: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['ResponsiveImage'],
    },
    name: {
      type: 'text',
      translatable: true,
      required: true,
      display_name: 'Name',
    },
    title: {
      type: 'text',
      translatable: true,
      required: true,
      display_name: 'Title',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'KnowledgeAuthor',
}
