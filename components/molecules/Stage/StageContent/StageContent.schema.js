import Richtext from '~/components/atoms/Richtext/Richtext.schema'

export default {
  name: 'StageContent',
  display_name: 'StageContent',
  schema: {
    headline: {
      type: 'text',
      translatable: true,
      required: true,
      display_name: 'Headline',
      max_length: '65',
      pos: 1,
    },
    subline: {
      type: 'text',
      translatable: true,
      display_name: 'Subheadline',
      max_length: '65',
      pos: 2,
    },
    teaserText: {
      ...Richtext.schema.richtext,
      display_name: 'Teaser Text',
      max_length: '250',
      pos: 3,
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
  real_name: 'Stage',
  component_group_uuid: null,
}
