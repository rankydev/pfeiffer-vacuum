import responsiveImage from './../../atoms/ResponsiveImage/ResponsiveImage.schema.js'

export default {
  name: 'ImageWithSource',
  display_name: 'Image with Source',
  schema: {
    description: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['RichtextBasic'],
      display_name: 'Description',
    },
    image: responsiveImage.schema.image,
    format: {
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
  real_name: 'ImageWithSource',
}
