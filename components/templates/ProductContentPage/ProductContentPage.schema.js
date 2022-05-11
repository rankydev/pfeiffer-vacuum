import Seo from '../Page/PageSeo.schema.partial.js'
import Social from '../Page/PageSocial.schema.partial.js'
import Page from '../Page/Page.schema.js'

export default {
  name: 'ProductContentPage',
  display_name: 'Product Content Page',
  schema: {
    title: Page.schema.title,
    quicklinks: Page.schema.quicklinks,
    stage: {
      type: 'bloks',
      display_name: 'Stage',
      restrict_components: true,
      component_whitelist: ['Stage'],
      maximum: 1,
    },
    body: {
      type: 'bloks',
      display_name: 'Content',
      restrict_components: true,
      component_whitelist: [
        'Accordion',
        'AnchorWrapper',
        'VideoPlayer',
        'ContentMediaBlock',
        'ContentTextBlock',
      ],
    },
    ...Seo,
    ...Social,
    'tab-advanced': {
      type: 'tab',
      display_name: 'Advanced',
      keys: ['template', 'uiComponent'],
    },
    template: Page.schema.template,
    uiComponent: {
      type: 'text',
      default_value: 'Page',
    },
  },
  image: null,
  preview_field: null,
  is_root: true,
  preview_tmpl: null,
  is_nestable: false,
  all_presets: [],
  preset_id: null,
  real_name: 'ProductContentPage',
  color: null,
  icon: null,
  component_group_name: 'Templates',
}
