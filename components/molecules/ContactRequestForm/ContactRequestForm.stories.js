import ContactRequestForm from './ContactRequestForm'

export default {
  title: 'Molecules/m_115 ContactRequestForm',
  component: ContactRequestForm,
  parameters: {
    docs: {
      description: {
        component:
          'This component is a form that can be filled out with inputs as well as validated. In addition to that it offers the possibility to send a contact request.',
      },
      source: {
        code: '<ContactRequestForm />',
      },
    },
  },
}

const Template = (args) => ({
  components: { ContactRequestForm },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <ContactRequestForm v-bind="args"/>
  </div>
`,
})

export const GeneralRequest = Template.bind({})
GeneralRequest.args = {
  contactRequestType: 'GENERAL_QUERY',
}

export const TopicRequest = Template.bind({})
TopicRequest.args = {
  contactRequestType: 'PRODUCT',
}
