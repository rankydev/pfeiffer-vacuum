import HeaderContent from './Header.stories.content.js'
import Header from './Header.vue'

const argTypes = {
  flyoutLinks: {
    defaultValue: HeaderContent.flyoutLinks,
    control: { type: 'array' },
  },
  navigationEntries: {
    defaultValue: HeaderContent.navigationEntries,
    control: { type: 'array' },
  },
}

export default {
  title: 'Organisms/o_100 Header',
  component: Header,
  parameters: {
    docs: {
      description: {
        component:
          'This is the main header of the application. <br>' +
          'It contains the flyout links and the main navigation. <br><br>' +
          'Further information on how the header is structured can be found here: <br>' +
          'https://confluence.diva-e.com/display/PVWEB/Header+Component',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args) => ({
  components: { Header },
  setup() {
    return {
      args,
    }
  },
  template: `
  <div class="documentation-preview">
    <Header v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
