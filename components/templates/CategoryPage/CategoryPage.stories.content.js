import header from '~/components/organisms/Header/Header.stories.content.js'
import { footerContent } from '~/components/organisms/Footer/Footer.stories.content.js'
import { OnPageNavigationContent } from '~/components/molecules/OnPageNavigation/OnPageNavigation.stories.content.js'

export default {
  content: {
    header: [header],
    quicklinks: [OnPageNavigationContent],
    body: [],
    footer: [footerContent],
    component: 'CategoryPage',
  },
}
