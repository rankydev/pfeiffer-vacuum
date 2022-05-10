import Page from '~/components/templates/Page/Page.vue'
import {
  imprintStandardPageContent,
  privacyStandardPageContent,
} from './StandardPage.stories.content'

export default {
  title: 'Templates/StandardPage',
  component: Page,
  parameters: {
    docs: {
      description: {
        component:
          'A standard page of the application. This template is used for example for imprint and data privacy.',
      },
    },
  },
}

const TemplateImprint = (args) => ({
  components: { Page },
  setup() {
    const content = imprintStandardPageContent.content
    return { args, content }
  },
  template: `
    <div class="documentation-preview">
    <Page v-bind="{ content }" />
    </div>
  `,
})

const TemplatePrivacy = (args) => ({
  components: { Page },
  setup() {
    const content = privacyStandardPageContent.content
    return { args, content }
  },
  template: `
    <div class="documentation-preview">
    <Page v-bind="{ content }" />
    </div>
  `,
})

export const Imprint = TemplateImprint.bind({})
export const DataPrivacy = TemplatePrivacy.bind({})
