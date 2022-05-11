import Page from '~/components/templates/Page/Page.vue'
import PageContent from './Page.stories.content'

export default {
  title: 'Templates/Page',
  component: Page,
  parameters: {
    docs: {
      description: {
        component: 'The main page of the appication',
      },
    },
  },
}

const Template = (args) => ({
  components: { Page },
  setup() {
    const content = PageContent.content
    return { args, content }
  },
  template: `
  <div class="documentation-preview">
    <Page v-bind="{ content }" />
  </div>
`,
})

export const Default = Template.bind({})
