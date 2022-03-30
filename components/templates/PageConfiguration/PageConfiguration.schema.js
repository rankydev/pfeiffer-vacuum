import Page from '../Page/Page.schema.js'

export default {
  name: 'PageConfiguration',
  display_name: 'Page Configuration',
  schema: {
    top: {
      type: 'bloks',
      display_name: 'Top',
      restrict_components: true,
      component_whitelist: [],
    },
    header: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Header'],
    },

    stage: Page.schema.stage,
    body: Page.schema.body,
    bottom: Page.schema.bottom,

    footer: {
      type: 'bloks',
      display_name: 'Footer',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['Footer'],
    },
  },
  image: null,
  preview_field: null,
  is_root: true,
  preview_tmpl: null,
  is_nestable: false,
  all_presets: [],
  preset_id: null,
  real_name: 'PageConfiguration',
  component_group_uuid: null,
}
