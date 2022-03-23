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
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    docs: {
      description: {
        component: 'The main header of the appication',
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
