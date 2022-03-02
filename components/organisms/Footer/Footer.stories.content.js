import {
  footerNavigationColumn,
  footerNavigation,
  newsletter,
} from './partials/FooterNavigation/FooterNavigation.stories.content'
import socialMedia from '../../molecules/SocialMedia/SocialMedia.content'
import { copyright } from './partials/FooterBottom/FooterBottom.stories.content'

export const footerContent = {
  socialMedia,
  footerNavigation,
  copyright,
}

export const footerContent2 = {
  socialMedia,
  footerNavigationColumn: footerNavigationColumn,
  newsletter: newsletter,
  legalText: copyright,
}

export default {}
