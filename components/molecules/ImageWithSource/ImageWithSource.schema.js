import responsiveImage from './../../atoms/ResponsiveImage/ResponsiveImage.schema.js'

export default {
  name: 'imageWithSource',
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
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: false,
  all_presets: [],
  preset_id: null,
  real_name: 'imageWithSource',
}
