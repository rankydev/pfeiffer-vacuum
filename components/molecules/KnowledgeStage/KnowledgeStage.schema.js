import Richtext from '~/components/atoms/Richtext/Richtext.schema'

export default {
  name: 'KnowledgeStage',
  display_name: 'Knowledge Stage',
  schema: {
    image: {
      type: 'asset',
      description: '',
      display_name: 'Image',
      filetypes: ['images'],
      required: true,
    },
    date: {
      type: 'datetime',
      disable_time: false,
      display_name: 'Date',
    },
    hours: {
      type: 'text',
      display_name: 'Duration Hours',
    },
    minutes: {
      type: 'text',
      display_name: 'Duration Minutes',
    },
    isWhitepaper: {
      type: 'boolean',
      description:
        'If the component is a whitepaper, time and duration will not be displayed',
      display_name: 'isWhitepaper',
      default_value: false,
    },
    headline: {
      type: 'text',
      display_name: 'Headline',
    },
    summary: {
      ...Richtext.schema.richtext,
      display_name: 'Summary',
      max_length: '250',
    },
    button: {
      type: 'bloks',
      restrict_components: true,
      maximum: 1,
      component_whitelist: ['KnowledgeAssetButton'],
      display_name: 'Asset Button',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'KnowledgeStage',
  component_group_uuid: null,
  color: null,
  icon: null,
}
