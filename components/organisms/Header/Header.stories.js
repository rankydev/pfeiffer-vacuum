import HeaderContent from './Header.stories.content.js'
import Header from './Header.vue'

export default {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    docs: {
      description: {
        component: 'The main header of the appication',
      },
    },
  },
}

const Template = (args) => ({
  components: { Header },
  setup() {
    const flyoutLinks = HeaderContent.flyoutLinks
    const navigationEntries = HeaderContent.navigationEntries
    return { args, flyoutLinks, navigationEntries }
  },
  template: `
  <div class="documentation-preview">
    <Header v-bind="{ flyoutLinks, navigationEntries }" />
  </div>
`,
})

export const Default = Template.bind({})
