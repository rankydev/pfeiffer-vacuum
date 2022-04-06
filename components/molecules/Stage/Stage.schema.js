export default {
  name: 'Stage',
  display_name: 'Stage',
  schema: {
    variant: {
      type: 'option',
      exclude_empty_option: true,
      default_value: 'fullImage',
      description:
        'The variants of the stage based on the content that should be displayed.',
      options: [
        {
          value: 'fullImage',
          name: 'Full image',
        },
        {
          value: 'withText',
          name: 'Image and content',
        },
      ],
      pos: 1,
    },
    image: {
      type: 'asset',
      description: '',
      display_name: 'Image',
      filetypes: ['images'],
      pos: 2,
    },
    imagePosition: {
      type: 'option',
      exclude_empty_option: true,
      default_value: 'right',
      description: 'The position of the image in the stage.',
      options: [
        {
          value: 'right',
          name: 'right',
        },
        {
          value: 'left',
          name: 'left',
        },
      ],
      pos: 3,
    },
    stageContent: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['StageContent'],
      display_name: 'Stage Content',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'Stage',
  component_group_uuid: null,
}
