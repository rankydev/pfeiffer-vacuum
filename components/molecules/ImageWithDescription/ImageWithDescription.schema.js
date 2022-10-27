import responsiveImage from './../../atoms/ResponsiveImage/ResponsiveImage.schema.js'
import Richtext from '~/components/atoms/Richtext/Richtext.schema.js'

export default {
  name: 'ImageWithDescription',
  display_name: 'Image module with source',
  schema: {
    description: {
      ...Richtext.schema.richtext,
      display_name: 'Description',
    },
    image: responsiveImage.schema.image,
    aspectRatio: {
      display_name: 'Aspect Ratio',
      type: 'option',
      exclude_empty_option: true,
      default_value: '1:1',
      description: 'The variants of different image formats',
      options: [
        {
          name: '1:1',
          value: '1:1',
        },
        {
          name: '3:2',
          value: '3:2',
        },
        {
          name: '2:3',
          value: '2:3',
        },
        {
          name: '16:9',
          value: '16:9',
        },
        {
          name: '2:1',
          value: '2:1',
        },
        {
          name: '3:1',
          value: '3:1',
        },
      ],
    },
  },
  is_root: false,
  is_nestable: true,
  real_name: 'ImageWithDescription',
}
