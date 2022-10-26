export default {
  name: 'VideoPlayer',
  display_name: 'Video Player Module',
  schema: {
    url: {
      type: 'text',
      display_name: 'Url',
      required: true,
      description: 'Currently supported videos: Youtube',
      translatable: true,
    },
    title: {
      type: 'text',
      display_name: 'Titel',
      required: true,
      max_length: '55',
      description:
        'The title is used for accessibility. It will not be visible on the page.',
      translatable: true,
    },
    description: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Richtext'],
      display_name: 'Description',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'VideoPlayer',
}
