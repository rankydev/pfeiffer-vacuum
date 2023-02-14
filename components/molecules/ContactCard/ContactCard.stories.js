import ContactCard from './ContactCard'

export default {
  title: 'Molecules/m_147 ContactCard',
  component: ContactCard,
  parameters: {
    docs: {
      description: {
        component:
          'This component displays the contact data of the account manager. Furthermore, an account manager card gets shown on the MyAccount area to the user.',
      },
      source: {
        code: '<ContactCard v-bind="{}"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { ContactCard },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ContactCard v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
Default.args = {}
