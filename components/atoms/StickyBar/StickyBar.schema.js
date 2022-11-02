import Link from '~/components/atoms/Link/Link.schema.partial.js'

export default {
  name: 'StickyBar',
  display_name: 'Sticky Bar',
  schema: {
    label: {
      type: 'text',
      max_length: '55',
      translatable: true,
      description: 'this text is only shown on tablet and desktop',
    },
    icon: {
      type: 'text',
      required: true,
      description:
        'Use an icon from https://fonts.google.com/icons here (e.g. calculate)',
    },
    ...Link,
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'StickyBar',
}
