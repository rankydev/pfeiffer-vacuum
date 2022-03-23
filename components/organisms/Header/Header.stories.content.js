import navigationEntries from './partials/MainNavigationLevel/MainNavigationLevel.stories.content.js'
import {
  flyoutEntry1,
  flyoutEntry2,
  flyoutEntry3,
} from '~/components/molecules/FlyoutEntry/FlyoutEntry.stories.content.js'

export default {
  component: 'Header',
  flyoutLinks: [flyoutEntry1, flyoutEntry2, flyoutEntry3],
  navigationEntries,
}
