import PvFooter from '~/components/organisms/PvFooter/PvFooter.vue'
import {
  footerMenus,
  newsletter,
} from './partials/PvFooterNavigation/PvFooterNavigation.stories.content'
import { copyright } from './partials/PvFooterBottom/PvFooterBottom.stories.content'

const argTypes = {
  footerTop: {
    defaultValue: {
      socialMedia: true,
    },
    control: { type: 'object' },
  },
  footerNavigation: {
    defaultValue: {
      footerMenus,
      newsletter,
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
        <pv-footer :footerTop="footerTop" :footerNavigation="footerNavigation" :footerBottom="footerBottom" />
      </div>
    `

export const PageFooter = (args, { argTypes }) => ({
  components: { PvFooter },
  props: Object.keys(argTypes),
  template,
})
