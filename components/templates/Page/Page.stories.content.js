import header from '~/components/organisms/Header/Header.stories.content.js'
import { footerContent } from '~/components/organisms/Footer/Footer.stories.content.js'
import { OnPageNavigationContent } from '~/components/molecules/OnPageNavigation/OnPageNavigation.stories.content.js'

export default {
  content: {
    top: [],
    body: [],
    name: 'Welcome',
    text: 'Build with Storyblok-CMS right now',
    stage: [],
    title: 'Home',
    bottom: [],
    footer: [footerContent],
    header: [header],
    noindex: false,
    ogImage: {
      id: null,
      alt: null,
      name: '',
      focus: null,
      title: null,
      filename: '',
      copyright: null,
      fieldtype: 'asset',
    },
    ogTitle: '',
    nofollow: false,
    seoTitle: '',
    template: '',
    canonical: '/',
    component: 'Page',
    quicklinks: [OnPageNavigationContent],
    twitterImage: {
      id: null,
      alt: null,
      name: '',
      focus: null,
      title: null,
      filename: '',
      copyright: null,
      fieldtype: 'asset',
    },
    twitterTitle: '',
    ogDescription: '',
    seoDescription: '',
    twitterDescription: '',
  },
}
