import Seo from '../Page/PageSeo.schema.partial.js'
import Social from '../Page/PageSocial.schema.partial.js'
import Template from '../Page/PageTemplate.schema.partial.js'
import Page from '../Page/Page.schema.js'

export default {
  name: 'EcomPage',
  display_name: 'Ecom Page',
  schema: {
    title: Page.schema.title,
    stage: {
      type: 'bloks',
      display_name: 'Stage',
      restrict_components: true,
      component_whitelist: ['Stage'],
      maximum: 1,
    },
    quicklinks: Page.schema.quicklinks,
    body: {
      type: 'bloks',
      display_name: 'Content',
      restrict_components: true,
      component_whitelist: ['RegistrationSuccessPage', 'RegistrationPage'],
    },
    bottom: {
      type: 'bloks',
      display_name: 'Bottom',
      restrict_components: true,
      component_whitelist: ['HelpContainer'],
    },
    ...Seo,
    ...Social,
    ...Template,
  },
  is_root: true,
  preview_tmpl: '<div><i class="uk-icon-cog"></i></div>',
  is_nestable: false,
  real_name: 'ProductContentPage',
  component_group_name: 'Templates',
}
