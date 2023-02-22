import Seo from './PageSeo.schema.partial.js'
import Social from './PageSocial.schema.partial.js'
import Template from './PageTemplate.schema.partial.js'

export default {
  name: 'Page',
  display_name: 'Page',
  schema: {
    title: {
      type: 'text',
      required: true,
      max_length: '55',
      description:
        'Keep the title around 50 characters and put the keywords you’re focusing on first.',
      translatable: true,
    },
    top: {
      type: 'bloks',
      display_name: 'Top',
      restrict_components: true,
      component_whitelist: [],
    },
    quicklinks: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['OnPageNavigation'],
    },
    stage: {
      type: 'bloks',
      display_name: 'Stage',
      restrict_components: true,
      component_whitelist: ['Stage', 'HomeStage', 'ErrorImageStage'],
      maximum: 1,
    },
    body: {
      type: 'bloks',
      display_name: 'Content',
      restrict_components: true,
      component_whitelist: [
        'KnowledgeAuthorsList',
        'KnowledgeAuthor',
        'Accordion',
        'AnchorWrapper',
        'ContentMediaBlock',
        'ContentTextBlock',
        'CustomContentCardCarousel',
        'DocumentCardCarousel',
        'GeneralTeaserCarousel',
        'ImageWithDescription',
        'ProductCardCarousel',
        'TeaserCardCarousel',
        'HelpContainer',
        'ImageBanner',
        'ColumnView',
      ],
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
  is_nestable: false,
  real_name: 'Page',
  component_group_name: 'Templates',
}
