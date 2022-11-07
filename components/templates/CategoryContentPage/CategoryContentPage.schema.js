import Seo from '../Page/PageSeo.schema.partial.js'
import Social from '../Page/PageSocial.schema.partial.js'
import Template from '../Page/PageTemplate.schema.partial.js'
import Page from '../Page/Page.schema.js'

export default {
  name: 'CategoryContentPage',
  display_name: 'Category Content Page',
  schema: {
    title: Page.schema.title,
    categoryShopId: {
      display_name: 'Category ID',
      type: 'text',
      max_length: '55',
      description:
        'Connect your content page with the shop by entering the shop category ID.',
    },
    quicklinks: Page.schema.quicklinks,
    stage: {
      type: 'bloks',
      display_name: 'Stage',
      restrict_components: true,
      component_whitelist: ['Stage'],
      maximum: 1,
    },
    body: Page.schema.body,
    ...Seo,
    ...Social,
    ...Template,
    uiComponent: {
      type: 'text',
      default_value: 'CategoryContentPage',
    },
  },
  is_root: true,
  is_nestable: false,
  real_name: 'CategoryContentPage',
  component_group_name: 'Templates',
}
