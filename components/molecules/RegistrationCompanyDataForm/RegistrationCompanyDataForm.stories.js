import RegistrationCompanyDataForm from './RegistrationCompanyDataForm'

export default {
  title: 'Molecules/m_126 RegistrationCompanyDataForm',
  component: RegistrationCompanyDataForm,
  parameters: {
    docs: {
      description: {
        component:
          'This component is a form that holds the data of the company. The form can be added via click on the initial shown button, as well as removed by the "Delete/Entfernen" Button.',
      },
      source: {
        code: '<RegistrationCompanyDataForm v-bind="{}"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { RegistrationCompanyDataForm },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <RegistrationCompanyDataForm v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
