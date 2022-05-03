export default {
  name: 'CTABox',
  display_name: 'CTABox',
  schema: {
    image: {
      type: 'asset',
      display_name: 'Image',
      required: true,
      description: 'Please enter the image title',
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
      component_whitelist: ['RichtextBasic'],
      display_name: 'Description',
    },
    buttons: {
      type: 'bloks',
      maximum: 2,
      restrict_components: true,
      component_whitelist: ['Button'],
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'CTABox',
}
