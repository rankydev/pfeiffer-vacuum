import {
  footerMenuOne,
  footerMenuThree,
  footerMenuTwo,
} from '~/components/molecules/LinkList/LinkList.stories.content'
import socialMedia from './partials/SocialMedia/SocialMedia.stories.content'

const navigationColumns = [footerMenuOne, footerMenuTwo, footerMenuThree]
const copyright = '© 2021 Pfeiffer Vacuum GmbH'

export const footerContent = {
  socialMedia,
  navigationColumns,
  copyright,
}

export default {}
