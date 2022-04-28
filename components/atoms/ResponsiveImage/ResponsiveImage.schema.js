export default {
  name: 'ResponsiveImage',
  display_name: 'Responsive Image',
  schema: {
    image: {
      type: 'asset',
      filetypes: ['images'],
      translatable: true,
      description: 'Image',
      display_name: 'Image',
      required: true,
    },
  },
  is_root: false,
  is_nestable: true,
  real_name: 'ResponsiveImage',
}
