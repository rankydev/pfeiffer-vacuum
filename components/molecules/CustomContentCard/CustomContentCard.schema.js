import Link from '~/components/atoms/Link/Link.schema.js'

export default {
  name: 'CustomContentCard',
  display_name: 'CustomContentCard',
  schema: {
    date: {
      type: 'datetime',
      disable_time: true,
      display_name: 'Date',
    },
    image: {
      type: 'asset',
      display_name: 'Image',
      required: true,
      translatable: true,
    },
    title: {
      type: 'text',
      required: true,
      translatable: true,
      display_name: 'Title',
      max_length: '30',
    },
    description: {
      type: 'text',
      translatable: true,
      required: true,
      display_name: 'Description',
      max_length: '150',
    },
    href: Link.schema.href,
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'CustomContentCard',
}
