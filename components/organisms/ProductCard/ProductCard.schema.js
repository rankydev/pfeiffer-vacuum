export default {
  name: 'ProductCard',
  display_name: 'ProductCard',
  schema: {
    productID: {
      type: 'text',
      required: true,
      pos: 1,
      max: 1,
      display_name: 'Product-ID',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: null,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ProductCard',
}
