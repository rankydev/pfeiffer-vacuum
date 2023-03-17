import Richtext from '~/components/atoms/Richtext/Richtext.schema'

export default {
  name: 'PromotionTeaser',
  display_name: 'PromotionTeaser / Jump to vacuum calculator',
  schema: {
    headline: {
      type: 'text',
      translatable: true,
      required: true,
      display_name: 'Headline',
      pos: 1,
    },
    subline: {
      type: 'text',
      translatable: true,
      display_name: 'Subheadline',
      pos: 2,
    },
    teaserText: {
      ...Richtext.schema.richtext,
      display_name: 'Teaser Text',
      max_length: '450',
      pos: 3,
    },
    image: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['ResponsiveImage'],
      pos: 4,
    },
    button: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Button'],
      display_name: 'Button',
      required: true,
      pos: 5,
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'PromotionTeaser / Jump to vacuum calculator',
  component_group_uuid: null,
}
