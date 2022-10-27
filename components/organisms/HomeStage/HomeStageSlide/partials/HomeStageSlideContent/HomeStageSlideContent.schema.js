import Richtext from '~/components/atoms/Richtext/Richtext.schema.js'

export default {
  name: 'HomeStageSlideContent',
  display_name: 'HomeStageSlideContent',
  schema: {
    headline: {
      type: 'text',
      translatable: true,
      required: true,
      display_name: 'Headline',
      max_length: '50',
      pos: 1,
    },
    richtext: {
      ...Richtext.schema.richtext,
      display_name: 'Description',
    },
    buttons: {
      type: 'bloks',
      restrict_components: true,
      maximum: 2,
      component_whitelist: ['Button'],
      display_name: 'Buttons',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'HomeStageSlideContent',
  component_group_uuid: null,
}
