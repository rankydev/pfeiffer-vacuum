import RegistrationPage from './RegistrationPage'

export default {
  title: 'ECOM Pages/ecom_2 RegistrationPage',
  component: RegistrationPage,
  parameters: {
    docs: {
      description: {
        component:
          'This component wraps the content of the registration page. It can only be used on Ecom page templates.',
      },
      source: {
        code: '<RegistrationPage v-bind="{}"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { RegistrationPage },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <RegistrationPage v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
