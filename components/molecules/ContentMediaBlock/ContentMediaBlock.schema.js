import RichtextBasic from '~/components/atoms/Richtext/RichtextBasic.schema.js'

export default {
  name: 'ContentMediaBlock',
  display_name: 'ContentMediaBlock',
  schema: {
    title: {
      type: 'text',
      required: true,
      max_length: '55',
      translatable: true,
    },
    subTitle: {
      type: 'text',
      required: true,
      max_length: '55',
      translatable: true,
    },
    richtext: RichtextBasic.schema.richtext,
    buttons: {
      type: 'bloks',
      maximum: 2,
      restrict_components: true,
      component_whitelist: ['Button'],
    },
    media: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['VideoPlayer'],
    },
    ratio: {
      type: 'option',
      use_uuid: true,
      desciption: 'Aspect ratio between both elements',
      required: true,
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
    },
    order: {
      type: 'option',
      use_uuid: true,
      desciption: 'sort order of text and media item',
      required: true,
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
