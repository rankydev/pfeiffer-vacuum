import QuicklinkNavigation from './QuicklinkNavigation.vue'
import { quicklinks } from './QuicklinkNavigation.stories.content'

const argTypes = {
  quicklinks: {
    defaultValue: quicklinks,
    control: { type: 'array' },
  },
}

export default {
  title: 'Molecules/Quicklink Navigation',
  component: QuicklinkNavigation,
  parameters: {
    docs: {
      source: {
        code: '<QuicklinkNavigation v-bind="{ quicklinks }" />',
      },
      description: {
        component: `Quicklinks for on page navigation via anchors to elements which use the QuicklinkWrapper component.
        The QuicklinkNavigation is used within the [OnPage Navigation](./?path=/story/molecules-onpage-navigation--default)`,
      },
    },
  },
  argTypes: argTypes,
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
