import QuicklinkNavigation from './QuicklinkNavigation.vue'
import { quicklinks } from './QuicklinkNavigation.stories.content'

export default {
  title: 'Molecules/Quicklink Navigation',
  component: QuicklinkNavigation,
  parameters: {
    docs: {
      source: {
        code: '<QuicklinkNavigation v-bind="{ quicklinks }" />',
      },
      description: {
        component: 'Quicklinks for on page navigation.',
      },
    },
  },
}

const Template = () => ({
  components: { QuicklinkNavigation },
  setup() {
    const mockedLinks = quicklinks
    return { mockedLinks }
  },
  template: `
  <div class="documentation-preview">
    <QuicklinkNavigation v-bind="{ quicklinks: mockedLinks }" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  quicklinks,
}
