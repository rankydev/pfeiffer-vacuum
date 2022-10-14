import CategoryContentPage from '~/components/templates/CategoryContentPage/CategoryContentPage.vue'
import data from './CategoryContentPage.stories.content'

export default {
  title: 'Templates/CategoryContentPage',
  component: CategoryContentPage,
  parameters: {
    docs: {
      description: {
        component: 'A category content page of the application',
      },
    },
  },
}

const Template = (args) => ({
  components: { CategoryContentPage },
  setup() {
    const { content } = data
    return { args, content }
  },
  template: `
  <div class="documentation-preview">
    <CategoryContentPage v-bind="{ content }" />
  </div>
`,
})

export const Default = Template.bind({})
