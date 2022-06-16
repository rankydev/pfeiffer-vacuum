import Link from '~/components/atoms/Link/Link.schema.partial.js'

export default {
  name: 'DocumentCard',
  display_name: 'DocumentCard',
  schema: {
    image: {
      type: 'asset',
      display_name: 'Image',
      translatable: true,
      required: true,
    },
    href: Link.href,
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'DocumentCard',
}
