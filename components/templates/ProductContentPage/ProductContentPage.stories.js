import ProductContentPage from '~/components/templates/ProductContentPage/ProductContentPage.vue'
import ProductContentPageContent from './ProductContentPage.stories.content'

export default {
  title: 'Templates/ProductContentPage',
  component: ProductContentPage,
  parameters: {
    docs: {
      description: {
        component: 'A product content page of the application',
      },
    },
  },
}

const Template = (args) => ({
  components: { ProductContentPage },
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
