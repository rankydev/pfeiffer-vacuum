import FooterNewsletter from './FooterNewsletter.vue'
import {
  newsletterHeadline,
  newsletterRichtext,
  newsletterButton,
} from '~/components/organisms/Footer/partials/FooterNewsletter/FooterNewsletter.stories.content.js'

const argTypes = {
  headline: {
    name: 'newsletterHeadline',
    defaultValue: newsletterHeadline,
    control: { type: 'text' },
  },
  richtext: {
    name: 'newsletterRichtext',
    defaultValue: newsletterRichtext,
    control: { type: 'array' },
  },
  button: {
    name: 'newsletterButton',
    defaultValue: newsletterButton,
    control: { type: 'array' },
  },
}

export default {
  title: 'Organisms/FooterNewsletter',
  component: FooterNewsletter,
  parameters: {
    docs: {
      description: {
        component:
          'The FooterNewsletter component is used to offer the possibility to subscribe for the newsletter in the Footer. Below the headline of the component can be defined a description which is a richtext and up to 1 button.',
      },
      source: {
        code: '<FooterNewsletter v-bind="{ headline richtext button }"  />',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args) => ({
  components: { FooterNewsletter },
  setup() {
    return {
      args,
    }
  },
  template: `
    <div class="documentation-preview tw-p-8 tw-bg-pv-grey-16 tw-text-inverse">
    <FooterNewsletter v-bind="args"/>
    </div>
  `,
})

export const Default = Template.bind({})
