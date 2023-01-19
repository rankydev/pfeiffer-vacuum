export default {
  name: 'ProductCard',
  display_name: 'Product-Card',
  schema: {
    product: {
      type: 'custom',
      required: true,
      field_type: 'pfeiffer-vacuum-shop-url-selector',
      display_name: 'Product-Picker',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  preview_tmpl: '<div>{{ product.name }}</div>',
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'ProductCard',
}
