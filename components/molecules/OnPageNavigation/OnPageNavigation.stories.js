import OnPageNavigation from './OnPageNavigation'
import { quicklinks } from './OnPageNavigation.stories.content'

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

const Template = () => ({
  components: { OnPageNavigation },
  setup() {
    const mockedLinks = quicklinks
    return { mockedLinks }
  },
  template: `
  <div class="documentation-preview">
    <OnPageNavigation v-bind="{ quicklinks: mockedLinks }" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  quicklinks,
}
