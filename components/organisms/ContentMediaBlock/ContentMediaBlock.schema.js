import Richtext from '~/components/atoms/Richtext/Richtext.schema.js'

export default {
  name: 'ContentMediaBlock',
  display_name: 'Content Media Block',
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
      ...Richtext.schema.richtext,
      required: true,
    },
    buttons: {
      type: 'bloks',
      maximum: 2,
      restrict_components: true,
      component_whitelist: ['Button', 'ButtonWithPermissionCheck'],
    },
    media: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      required: true,
      component_whitelist: ['VideoPlayer', 'ImageWithDescription', 'CTABox'],
    },
    ratio: {
      type: 'option',
      use_uuid: true,
      description: 'Aspect ratio between both elements',
      exclude_empty_option: true,
      options: [
        {
          value: 'half/half',
          name: '50:50',
        },
        {
          value: 'one/three',
          name: '33:66',
        },
        {
          value: 'three/one',
          name: '66:33',
        },
      ],
      default_value: 'three/one',
    },
    order: {
      type: 'option',
      use_uuid: true,
      description: 'sort order of text and media item',
      exclude_empty_option: true,
      options: [
        {
          value: 'content/media',
          name: ' Text | Media',
        },
        {
          value: 'media/content',
          name: 'Media | Text',
        },
      ],
      default_value: 'content/media',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ContentMediaBlock',
}
