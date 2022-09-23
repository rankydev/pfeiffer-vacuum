import header from '~/components/organisms/Header/Header.stories.content.js'
import { footerContent } from '~/components/organisms/Footer/Footer.stories.content.js'
import { OnPageNavigation } from '~/components/molecules/OnPageNavigation/OnPageNavigation.stories.content.js'

export default {
  content: {
    header: [header],
    quicklinks: [OnPageNavigation],
    body: [],
    footer: [footerContent],
    component: 'CategoryPage',
  },
}
