import QuicklinkNavigation from './QuicklinkNavigation.vue'
import QuicklinkNavigationContent from './QuicklinkNavigation.stories.content'

export default {
  title: 'Molecules/Quicklink Navigation',
  component: QuicklinkNavigation,
  parameters: {
    docs: {
      description: {
        component: 'Quicklinks for on page navigation.',
      },
    },
  },
}

const Template = (args) => ({
  components: { QuicklinkNavigation },
  setup() {
    const quicklinks = QuicklinkNavigationContent.quicklinks
    return { args, quicklinks }
  },
  template: `
  <div class="documentation-preview">
    <QuicklinkNavigation v-bind="{ quicklinks }" />
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  quicklinks: QuicklinkNavigationContent.quicklinks,
}
