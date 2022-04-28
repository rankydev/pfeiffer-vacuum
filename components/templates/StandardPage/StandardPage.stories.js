import Page from '~/components/templates/Page/Page.vue'
import { imprintStandardPageContent } from './StandardPage.stories.content'

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

const Template = (args) => ({
  components: { Page },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <Page v-bind="args" />
  </div>
`,
})

const imprintContent = imprintStandardPageContent.content
export const Imprint = Template.bind({})
Imprint.args = { imprintContent }
