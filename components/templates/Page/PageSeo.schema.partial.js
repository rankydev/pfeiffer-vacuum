export default {
  'tab-seo': {
    type: 'tab',
    display_name: 'SEO',
    keys: [
      'seoTitle',
      'seoDescription',
      'advanced',
      'noindex',
      'nofollow',
      'canonical',
    ],
  },
  seoTitle: {
    type: 'text',
    max_length: '255',
    description: 'Overrides the title.',
    translatable: true,
  },
  seoDescription: {
    type: 'textarea',
    translatable: true,
    description:
      'Use Unique, Keyword-Rich Meta Descriptions between 120–156 characters.',
    max_length: '156',
  },
  advanced: {
    type: 'section',
    keys: ['noindex', 'nofollow', 'canonical'],
    display_name: 'Advanced',
  },
  noindex: {
    type: 'boolean',
    description:
      'Instructs search engines not to show the page in search results.',
  },
  nofollow: {
    type: 'boolean',
    description:
      'Instructs search engines not to follow the links on this page.',
    display_name: '',
  },
  canonical: {
    type: 'multilink',
    restrict_content_types: true,
    component_whitelist: ['Page'],
    description:
      'A canonical is a way of telling search engines that a specific URL represents the master copy of a page. Using the canonical prevents problems caused by identical or "duplicate" content appearing on multiple URLs. If this field is empty there will be a canonical link to this page itself.',
    display_name: 'Custom Canonical URL',
  },
}
