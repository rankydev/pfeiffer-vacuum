import Seo from '~/components/templates/Page/PageSeo.schema.partial.js'
import Social from '~/components/templates/Page/PageSocial.schema.partial.js'
import Page from '~/components/templates/Page/Page.schema.js'

export default {
  name: 'KnowledgePage',
  display_name: 'Knowledge Page',
  schema: {
    title: Page.schema.title,
    stage: {
      type: 'bloks',
      display_name: 'Stage',
      restrict_components: true,
      component_whitelist: ['Stage'],
      maximum: 1,
    },
    ...Seo,
    ...Social,
    'tab-advanced': {
      type: 'tab',
      display_name: 'Advanced',
      keys: ['template', 'uiComponent'],
    },
    template: {
      type: 'option',
      use_uuid: true,
      source: 'internal_stories',
      folder_slug: '{0}/templates/',
      filter_content_type: 'PageConfiguration',
    },
    uiComponent: {
      type: 'text',
      default_value: 'KnowledgePage',
    },
  },
  is_root: true,
  is_nestable: false,
  real_name: 'KnowledgePage',
  component_group_name: 'Templates',
}
