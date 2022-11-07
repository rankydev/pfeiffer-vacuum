import responsiveImage from './../../atoms/ResponsiveImage/ResponsiveImage.schema.js'
import Link from '~/components/atoms/Link/Link.schema.partial.js'

export default {
  name: 'TeaserCard',
  display_name: 'General Teaser Component',
  schema: {
    headline: {
      type: 'text',
      translatable: true,
      required: true,
      max_length: '50',
      pos: 1,
    },
    image: responsiveImage.schema.image,
    ...Link,
  },
  preview_tmpl:
    '<div>' +
    '<div>Headline: {{ headline }}</div>' +
    '<div>{{ image(options.image.filename)/ }}</div>' +
    '</div>',
  is_root: false,
  is_nestable: true,
  real_name: 'TeaserCard',
}
