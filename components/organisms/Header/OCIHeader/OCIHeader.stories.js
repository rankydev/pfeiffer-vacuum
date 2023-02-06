import OCIHeaderContent from './OCIHeader.stories.content.js'
import OCIHeader from './OCIHeader.vue'

const argTypes = {
  flyoutLinks: {
    defaultValue: OCIHeaderContent.flyoutLinks,
    control: { type: 'array' },
  },
  navigationEntries: {
    defaultValue: OCIHeaderContent.OCIHeaderEntries,
    control: { type: 'array' },
  },
}

export default {
  title: 'Organisms/o_XXX OCIHeader',
  component: OCIHeader,
  parameters: {
    docs: {
      description: {
        component:
          'This is the main header of the application. <br>' +
          'It contains the flyout links and the main navigation. <br><br>' +
          'Further information on how the header is structured can be found here: <br>' +
          'https://confluence.diva-e.com/display/PVWEB/OCIHeader+Component',
      },
    },
  },
  argTypes: argTypes,
}

const Template = (args) => ({
  components: { OCIHeader },
  setup() {
    return {
      args,
    }
  },
  template: `
  <div class="documentation-preview">
    <OCIHeader v-bind="args" />
  </div>
`,
})

export const Default = Template.bind({})
