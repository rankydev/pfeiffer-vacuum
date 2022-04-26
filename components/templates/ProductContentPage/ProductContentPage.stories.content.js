import header from '~/components/organisms/Header/Header.stories.content.js'
import { footerContent } from '~/components/organisms/Footer/Footer.stories.content.js'
import { OnPageNavigation } from '~/components/molecules/OnPageNavigation/OnPageNavigation.stories.content.js'
import stageContent from '~/components/molecules/Stage/Stage.stories.content.js'

export default {
  content: {
    top: [],
    body: [],
    name: 'Welcome',
    text: 'Build with Storyblok-CMS right now',
    title: 'Home',
    bottom: [],
    header: [header],
    stage: [stageContent],
    footer: [footerContent],
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
    quicklinks: [OnPageNavigation],
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
