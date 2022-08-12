import RichtextBasic from '~/components/atoms/Richtext/RichtextBasic.schema.js'

export default {
  name: 'ImageBanner',
  display_name: 'Image Banner',
  schema: {
    headline: {
      type: 'text',
      max_length: '55',
      translatable: true,
    },
    subline: {
      type: 'text',
      max_length: '55',
      translatable: true,
    },
    richtext: {
      ...RichtextBasic.schema.richtext,
      required: true,
      max_length: '200',
    },
    buttons: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Button'],
    },
    image: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      required: true,
      component_whitelist: ['ResponsiveImage'],
    },
    icon: {
      type: 'text',
      description:
        'Use an icon from https://fonts.google.com/icons here (e.g. calculate)',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ImageBanner',
}
