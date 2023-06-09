import header from '~/components/organisms/Header/Header.stories.content.js'
import { footerContent } from '~/components/organisms/Footer/Footer.stories.content.js'
import stageContent from '~/components/molecules/Stage/Stage.stories.content.js'
import contentTextBlock from '~/components/organisms/ContentTextBlock/ContentTextBlock.stories.content.js'

export default {
  content: {
    top: [],
    body: [contentTextBlock],
    name: 'Welcome',
    categoryShopId: 'FEEDTHROUGHS',
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
    component: 'CategoryContentPage',
    quicklinks: [],
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
