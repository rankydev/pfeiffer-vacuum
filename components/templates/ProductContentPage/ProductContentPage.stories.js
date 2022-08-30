import Page from '~/components/templates/Page/Page.vue'
import ProductContentPageContent from './ProductContentPage.stories.content'

export default {
  title: 'Templates/ProductContentPage',
  component: Page,
  parameters: {
    docs: {
      description: {
        component: 'A product content page of the application',
      },
    },
  },
}

const Template = (args) => ({
  components: { Page },
  setup() {
    const content = ProductContentPageContent.content
    return { args, content }
  },
  template: `
  <div class="documentation-preview">
    <Page v-bind="{ content }" />
  </div>
`,
})

export const Default = Template.bind({})
