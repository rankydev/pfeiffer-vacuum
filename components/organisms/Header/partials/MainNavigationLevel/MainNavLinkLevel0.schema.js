import Link from '~/components/atoms/Link/Link.schema.partial.js'

export default {
  name: 'MainNavLinkLevel0',
  display_name: 'Navigation Entry',
  schema: {
    label: {
      type: 'text',
      translatable: true,
      display_name: 'Label',
      required: true,
    },
    ...Link,
    shopLink: {
      ...Link.href,
      display_name: 'Shop Link',
      required: false,
    },
    navigationEntries: {
      type: 'bloks',
      maximum: 10,
      restrict_components: true,
      component_whitelist: ['MainNavLinkLevel1'],
      description: 'Navigation entries displayed on first level.',
    },
    showPromotionTeaser: {
      type: 'boolean',
      display_name: 'Promotion Teaser',
      description: 'Display Promotion Teaser',
      default_value: false,
    },
    promotionTeaser: {
      type: 'bloks',
      maximum: 1,
      restrict_components: true,
      component_whitelist: ['PromotionTeaser'],
      description: 'Promotion Teaser content',
    },
    useHybrisCategories: {
      type: 'boolean',
      display_name: 'Use Hybris Category Tree?',
      description:
        'Use hybris category tree as navigation entries instead of storyblok?',
      default_value: 'false',
    },
  },
  image: null,
  preview_field: null,
  is_root: false,
  is_nestable: true,
  all_presets: [],
  preset_id: null,
  real_name: 'MainNavLinkLevel0',
  component_group_name: 'Global',
}
