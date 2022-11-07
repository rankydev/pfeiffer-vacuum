import Link from '~/components/atoms/Link/Link.schema.partial.js'

export default {
  name: 'DocumentCard',
  display_name: 'Document-Card',
  schema: {
    image: {
      type: 'asset',
      display_name: 'Image',
      translatable: true,
      required: true,
    },
    href: Link.href,
  },
  preview_tmpl:
    '<div>' + '<div>{{ image(options.image.filename)/ }}</div>' + '</div>',
  is_root: false,
  is_nestable: true,
  all_presets: [],
  real_name: 'DocumentCard',
}
