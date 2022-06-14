export default {
  name: 'ProductCard',
  display_name: 'ProductCard',
  schema: {
    product: {
      type: 'custom',
      required: true,
      field_type: 'shop-url-selector',
      options: [
        {
          name: 'domain',
          value: 'https://dev.vacuum-shop.com/api/shop',
        },
      ],
      display_name: 'Product-Picker',
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
