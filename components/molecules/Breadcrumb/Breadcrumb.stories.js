import Breadcrumb from './Breadcrumb'
import { useCmsStore } from '~/stores/cms'
import { watch } from '@nuxtjs/composition-api'
import cmsLinks from './Breadcrumb.stories.content'

export default {
  title: 'Molecules/m_105 Breadcrumbs',
  component: Breadcrumb,
  parameters: {
    docs: {
      source: {
        code: '<Breadcrumb />',
      },
      description: {
        component:
          'The Breadcrumb is a generic component which determines the values from the current route. Storybook can not display a breadcrumb longer than a single entry, because he has only the iframe.hmtl route.',
      },
    },
  },
}

const Template = () => ({
  components: { Breadcrumb },
  setup() {
    const cmsStore = useCmsStore()
    watch(
      () => cmsStore.cmsLinks,
      () => {
        if (cmsStore.cmsLinks?.length === cmsLinks.length) return
        cmsStore.cmsLinks = cmsLinks
      },
      { immediate: true }
    )
  },
  template: `
  <div class="documentation-preview">
    <Breadcrumb />
  </div>
`,
})

export const Default = Template.bind({})
