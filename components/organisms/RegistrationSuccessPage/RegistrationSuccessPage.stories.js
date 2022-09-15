import RegistrationSuccessPage from './RegistrationSuccessPage'

export default {
  title: 'ECOM Pages/ecom_1 RegistrationSuccessPage',
  component: RegistrationSuccessPage,
  parameters: {
    docs: {
      description: {
        component:
          'This component wraps the content of the registration success page. It can only be used on Ecom page templates.',
      },
      source: {
        code: '<RegistrationSuccessPage v-bind="{}"/>',
      },
    },
  },
}

const Template = (args) => ({
  components: { RegistrationSuccessPage },
  setup() {
    return { args }
  },
  template: `
  <div class="documentation-preview">
    <RegistrationSuccessPage v-bind="args"/>
  </div>
`,
})

export const Default = Template.bind({})
