import navigationEntries from '../MainNavigationLevel/MainNavigationLevel.stories.content.js'
import MainNavigation from './MainNavigation.vue'

export default {
  title: 'Molecules/m_100 Primary Navigation',
  component: MainNavigation,
  parameters: {
    docs: {
      source: {
        code: '<MainNavigation v-bind="{ navigationEntries }" />',
      },
      description: {
        component: 'Main Navigation component.',
      },
    },
  },
}

const Template = (args) => ({
  components: { MainNavigation },
  setup() {
    return {
      args,
    }
  },
  template: `
    <div class="documentation-preview">
    <MainNavigation v-bind="args" />
    </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  navigationEntries,
}
