import PvFooter from '~/components/organisms/Footer/Footer.vue'
import { footerContent } from './Footer.stories.content'

const argTypes = {
  socialMedia: {
    defaultValue: footerContent.socialMedia,
    control: { type: 'array' },
  },
  navigationColumns: {
    defaultValue: footerContent.navigationColumns,
    control: { type: 'array' },
  },
  headline: {
    name: 'newsletterHeadline',
    defaultValue: footerContent.headline,
    control: { type: 'text' },
  },
  richtext: {
    name: 'newsletterRichtext',
    defaultValue: footerContent.richtext,
    control: { type: 'array' },
  },
  button: {
    name: 'newsletterButton',
    defaultValue: footerContent.button,
    control: { type: 'array' },
  },
  copyright: {
    defaultValue: footerContent.copyright,
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
    return {
      args,
    }
  },
  template: `
  <div class="documentation-preview">
    <PvFooter v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
