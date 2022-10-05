import CategoryPage from '~/components/templates/CategoryPage/CategoryPage.vue'
import CategoryPageContent from './CategoryPage.stories.content'
import { watch } from '@nuxtjs/composition-api'
import { quicklinks } from '~/components/molecules/OnPageNavigation/OnPageNavigation.stories.content'
import { useCmsStore } from '~/stores/cms'
import { categoryPageBreadcrumb } from '~/components/molecules/Breadcrumb/Breadcrumb.stories.content.js'

export default {
  title: 'Templates/CategoryPage',
  component: CategoryPage,
  parameters: {
    docs: {
      description: {
        component: 'The category page of the application',
      },
    },
  },
}

const Template = (args) => ({
  components: { CategoryPage },
  setup() {
    const cmsStore = useCmsStore()

    watch(
      () => cmsStore.cmsLinks,
      () => {
        cmsStore.cmsLinks = categoryPageBreadcrumb
      }
    )

    const content = CategoryPageContent.content
    return { args, content }
  },
  template: `
  <div class="documentation-preview">
    <CategoryPage v-bind="{ content }" />
  </div>
`,
})

export const Default = Template.bind({
  quicklinks,
})
