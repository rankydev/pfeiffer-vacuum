import CreateAccount from './CreateAccount'

export default {
  title: 'Molecules/m_125 CreateAccount',
  component: CreateAccount,
  parameters: {
    docs: {
      description: {
        component:
          'This component is a form that can be filled out with inputs as well as validated. In addition to that it offers the possibility to registration request.',
      },
      source: {
        code: '<CreateAccount v-bind="{}"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { CreateAccount },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <CreateAccount v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
