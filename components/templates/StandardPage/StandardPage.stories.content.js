import header from '~/components/organisms/Header/Header.stories.content.js'
import { footerContent } from '~/components/organisms/Footer/Footer.stories.content.js'
import { imprintStageContent } from '~/components/molecules/Stage/Stage.stories.content.js'
import { imprintTextBlock } from '~/components/organisms/ContentTextBlock/ContentTextBlock.stories.content.js'

export default {
  content: {
    body: [imprintTextBlock],
    title: 'Home',
    header: [header],
    stage: [imprintStageContent],
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
