import MyAccountEditableTextfield from './MyAccountEditableTextfield'

export default {
  title: 'My Account/Editable Textfield',
  component: MyAccountEditableTextfield,
  parameters: {
    docs: {
      source: {
        code: '<MyACcountEditableTextfield v-bind="{ args }" />',
      },
    },
  },
}

const Template = () => ({
  components: { MyAccountEditableTextfield },
  setup() {
    const config = {
      label: 'Textfield',
      value: 'Lorem ipsum dolor sit amet',
      button: {
        label: 'Button',
        variant: 'secondary',
        shape: 'plain',
      },
      validation: {},
      editable: false,
      disabled: false,
    }

    return { config }
  },
  template: `
  <div class="documentation-preview">
    <MyAccountEditableTextfield v-bind="config" />
  </div>
`,
})

export const Default = Template.bind({})
