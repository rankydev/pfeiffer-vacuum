import responsiveImage from './../../atoms/ResponsiveImage/ResponsiveImage.schema.js'
import Link from '~/components/atoms/Link/Link.schema.partial.js'

export default {
  name: 'TeaserCard',
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
  is_root: false,
  is_nestable: true,
  real_name: 'TeaserCard',
}
