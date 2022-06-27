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
      component_whitelist: ['Stage', 'HomeStage'],
      maximum: 1,
    },
    body: {
      type: 'bloks',
      display_name: 'Content',
      restrict_components: true,
      component_whitelist: [
        'Accordion',
        'AnchorWrapper',
        'ContentMediaBlock',
        'ContentTextBlock',
        'CustomContentCardCarousel',
        'DocumentCardCarousel',
        'CustomContentCard',
        'TextArea',
        'FormInput',
        'ImageWithDescription',
        'VideoPlayer',
        'TeaserCardCarousel',
      ],
    },
    bottom: {
      type: 'bloks',
      display_name: 'Bottom',
      restrict_components: true,
      component_whitelist: [],
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
  real_name: 'Page',
  color: null,
  icon: null,
  component_group_name: 'Templates',
}
