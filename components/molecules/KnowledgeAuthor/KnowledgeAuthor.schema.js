export default {
  name: 'KnowledgeAuthor',
  display_name: 'KnowledgeAuthor',
  schema: {
    name: {
      type: 'text',
      max_length: '150',
      translatable: true,
    },
    title: {
      type: 'text',
      max_length: '150',
      translatable: true,
    },
    image: {
      type: 'asset',
      filetypes: ['images'],
      translatable: true,
      description: 'Image',
      display_name: 'Image',
      required: true,
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
