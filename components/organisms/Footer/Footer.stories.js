import PvFooter from '~/components/organisms/Footer/Footer.vue'
import {
  footerMenus,
  footerNavigation,
} from './partials/FooterNavigation/FooterNavigation.stories.content'
import { copyright } from './partials/FooterBottom/FooterBottom.stories.content'
import channels from '../../molecules/SocialMedia/SocialMedia.content'
import newsletterContent from '~/components/molecules/NewsletterInput/Newsletter.stories.content'

const argTypes = {
  /**
   *
   */
  socialMedia: {
    defaultValue: {
      channels,
    },
    control: { type: 'object' },
  },
  footerNavigation: {
    defaultValue: {
      footerMenus,
    },
    control: { type: 'object' },
  },
  newsletter: {
    defaultValue: {
      newsletterContent,
    },
    control: { type: 'object' },
  },
  footerBottom: {
    defaultValue: {
      copyright,
    },
    control: { type: 'object' },
  },
}

export default {
  title: 'Organisms/Footer',
  component: PvFooter,
  parameters: {
    docs: {
      description: {
        component: 'All parts of the page Footer combined.',
      },
    },
  },
  argTypes: argTypes,
}

const template = `
      <div class="documentation-preview">
        <pv-footer
        :socialMedia="socialMedia"
        :newsletter="newsletter"
        :footerNavigation="footerNavigation"
        :footerBottom="footerBottom"
        />
      </div>
    `

export const PageFooter = (args, { argTypes }) => ({
  components: { PvFooter },
  props: Object.keys(argTypes),
  template,
})
