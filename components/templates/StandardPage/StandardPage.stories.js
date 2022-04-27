import Page from '~/components/templates/Page/Page.vue'
import StandardPageContent from './StandardPage.stories.content'

export default {
  title: 'Templates/StandardPage',
  component: Page,
  parameters: {
    docs: {
      description: {
        component: 'A standard page of the application',
      },
    },
  },
}

const Template = (args) => ({
  components: { Page },
  setup() {
    const content = StandardPageContent.content
    return { args, content }
  },
  template: `
  <div class="documentation-preview">
    <Page v-bind="{ content }" />
  </div>
`,
})

export const Imprint = Template.bind({})
