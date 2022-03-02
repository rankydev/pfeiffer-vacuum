import PvFooter from '~/components/organisms/Footer/Footer.vue'
import {
  footerNavigationColumn,
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
  footerNavigationColumn: {
    defaultValue: {
      footerNavigationColumn,
    },
    control: { type: 'array' },
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

const Template = (args) => ({
  components: { PvFooter },
  setup() {
    const socialMedia = channels
    const newsletter = newsletterContent
    const footerNavigationColumn = footerNavigation.footerNavigationColumn
    const footerBottom = copyright
    return {
      args,
      socialMedia,
      newsletter,
      footerNavigationColumn,
      footerBottom,
    }
  },
  template: `
  <div class="documentation-preview">
    <pv-footer v-bind="{ socialMedia, newsletter, footerNavigationColumn, footerBottom }" />
  </div>
`,
})

export const Default = Template.bind({})
