import Seo from '../Page/PageSeo.schema.partial.js'
import Social from '../Page/PageSocial.schema.partial.js'
import Template from '../Page/PageTemplate.schema.partial.js'
import Page from '../Page/Page.schema.js'

export default {
  name: 'ContactPage',
  display_name: 'Contact Page',
  schema: {
    title: Page.schema.title,
    quicklinks: Page.schema.quicklinks,
    body: {
      type: 'bloks',
      display_name: 'Content',
      restrict_components: true,
      component_whitelist: ['ContactFormSection', 'AnchorWrapper'],
    },
    ...Seo,
    ...Social,
    ...Template,
  },
  image: null,
  preview_field: null,
  is_root: true,
  preview_tmpl: null,
  is_nestable: false,
  all_presets: [],
  preset_id: null,
  real_name: 'ContactPage',
  color: null,
  icon: null,
  component_group_name: 'Templates',
}
