import OnPageNavigation from './OnPageNavigation'
import { quicklinks } from './OnPageNavigation.stories.content'
import { useCmsStore } from '~/stores/cms'
import { watch } from '@nuxtjs/composition-api'
import cmsLinks from '~/components/molecules/Breadcrumb/Breadcrumb.stories.content.js'

export default {
  title: 'Molecules/OnPage Navigation',
  component: OnPageNavigation,
  parameters: {
    docs: {
      source: {
        code: '<OnPageNavigation v-bind="{ quicklinks }" />',
      },
      description: {
        component:
          'On page navigation component, which consists of the breadcrumbs and quicklink section.',
      },
    },
  },
}

const Template = (args) => ({
  components: { OnPageNavigation },
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
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <OnPageNavigation v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  quicklinks,
}
