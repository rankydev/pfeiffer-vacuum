import {
  footerMenuOne,
  footerMenuThree,
  footerMenuTwo,
} from '~/components/molecules/LinkList/LinkList.stories.content'
import socialMedia from '@/components/molecules/SocialMedia/SocialMedia.stories.content'
import newsletterContent from '~/components/organisms/Footer/partials/FooterNewsletter/FooterNewsletter.stories.content.js'

const navigationColumns = [footerMenuOne, footerMenuTwo, footerMenuThree]
const copyright = '© 2021 Pfeiffer Vacuum GmbH'

export const footerContent = {
  component: 'Footer',
  socialMedia,
  navigationColumns,
  newsletter: [newsletterContent],
  copyright,
}

export default {}
