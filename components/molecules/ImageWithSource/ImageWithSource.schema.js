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
      hide_empty_options: true,
      options: [
        {
          name: '1:1',
          value: '1:1',
        },
        {
          name: '2:3',
          value: '2:3',
        },
      ],
    },
  },
  is_root: false,
  is_nestable: true,
  real_name: 'ImageWithSource',
}
