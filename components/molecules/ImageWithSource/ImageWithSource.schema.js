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
  },
  is_root: false,
  is_nestable: true,
  real_name: 'ImageWithSource',
}
