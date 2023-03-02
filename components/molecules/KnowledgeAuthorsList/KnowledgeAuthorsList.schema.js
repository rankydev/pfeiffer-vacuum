export default {
  name: 'KnowledgeAuthorsList',
  display_name: 'KnowledgeAuthorsList',
  schema: {
    authorcardlist: {
      type: 'bloks',
      restrict_components: true,
      component_whitelist: ['KnowledgeAuthor'],
      description: 'List of Authorcards',
      display_name: 'AuthorCardList',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'KnowledgeAuthorsList',
}
