import OnPageNavigation from './OnPageNavigation'
import { quicklinks } from './OnPageNavigation.stories.content'
import { useCmsStore } from '~/stores/cms'
import { watch } from '@nuxtjs/composition-api'
import cmsLinks from '~/components/molecules/Breadcrumb/Breadcrumb.stories.content.js'

export default {
  title: 'Molecules/m_102 Quicklink Navigation',
  component: OnPageNavigation,
  parameters: {
    docs: {
      source: {
        code: '<OnPageNavigation v-bind="{ quicklinks }" />',
      },
      description: {
        component:
          'Quicklink Navigation component, which consists of the quicklink section.',
      },
    },
  },
}

const Template = (args) => ({
  components: { OnPageNavigation },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <OnPageNavigation v-bind="args" :hide-breadcrumb="true" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  quicklinks,
}
